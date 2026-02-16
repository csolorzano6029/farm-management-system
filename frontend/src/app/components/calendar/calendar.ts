import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleService } from '../../services/schedule.service';
import { CalendarDay, ScheduleModel, WorkerShift } from '../../models/schedule.model';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.html',
  styleUrls: ['./calendar.css'],
})
export class CalendarComponent implements OnInit {
  currentMonthStr: string = '';
  weekDays: string[] = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  calendarDays: CalendarDay[] = [];
  currentDate: Date = new Date();

  constructor(private readonly scheduleService: ScheduleService) {}

  ngOnInit(): void {
    this.loadCalendarData();
  }

  prevMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.loadCalendarData();
  }

  nextMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.loadCalendarData();
  }

  loadCalendarData() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth() + 1; // API expects 1-12

    this.scheduleService.findAllByMonth(year, month).subscribe({
      next: (schedules) => {
        this.generateCalendar(schedules);
      },
      error: (err) => {
        console.error('Error loading schedules', err);
        // Fallback or empty calendar on error
        this.generateCalendar([]);
      },
    });
  }

  generateCalendar(schedules: ScheduleModel[]) {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();

    // Format month string (e.g., "Febrero 2026")
    this.currentMonthStr = this.currentDate.toLocaleDateString('es-ES', {
      month: 'long',
      year: 'numeric',
    });
    this.currentMonthStr =
      this.currentMonthStr.charAt(0).toUpperCase() + this.currentMonthStr.slice(1);

    // Get first day of the month and total days
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDayOfWeek = firstDay.getDay(); // 0 (Sunday) to 6 (Saturday)

    this.calendarDays = [];

    // Previous month filler
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = 0; i < startDayOfWeek; i++) {
      this.calendarDays.push({
        date: prevMonthLastDay - (startDayOfWeek - 1) + i,
        isCurrentMonth: false,
        shifts: [],
      });
    }

    // Current month
    for (let i = 1; i <= daysInMonth; i++) {
      // Find schedules for this day
      // Note: Comparing dates can be tricky with timezones.
      // Assuming API returns YYYY-MM-DD and we construct local date correctly.
      // A safer way is to compare string representations.

      // Construct YYYY-MM-DD for current day 'i'
      const currentDayStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;

      const daySchedules = schedules.filter((s) => s.date === currentDayStr);

      const shifts: WorkerShift[] = daySchedules.map((s) => ({
        name: s.worker ? `${s.worker.firstName} ${s.worker.lastName}` : 'Unknown',
        hours: s.hours,
        role: s.worker?.role || 'N/A',
        extra: s.isExtra,
      }));

      this.calendarDays.push({
        date: i,
        isCurrentMonth: true,
        shifts: shifts,
      });
    }

    // Next month filler
    const totalCells = this.calendarDays.length;
    // We want to fill strictly until the end of the last week row
    const remainingCells = (7 - (totalCells % 7)) % 7;

    for (let i = 1; i <= remainingCells; i++) {
      this.calendarDays.push({
        date: i,
        isCurrentMonth: false,
        shifts: [],
      });
    }
  }
}
