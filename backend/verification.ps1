$baseUrl = "http://localhost:3000"

# 1. Create INGRESO Catalogue Type
Write-Host "Creating Catalogue Type: INGRESO"
$ingresoType = Invoke-RestMethod -Uri "$baseUrl/catalogue/types" -Method Post -Body (@{
    code = "INGRESO"
    name = "Ingreso"
    description = "Tipos de ingresos"
} | ConvertTo-Json) -ContentType "application/json"
Write-Host "Created Type ID: $($ingresoType.id)"

# 2. Create EGRESO Catalogue Type
Write-Host "Creating Catalogue Type: EGRESO"
$egresoType = Invoke-RestMethod -Uri "$baseUrl/catalogue/types" -Method Post -Body (@{
    code = "EGRESO"
    name = "Egreso"
    description = "Tipos de egresos"
} | ConvertTo-Json) -ContentType "application/json"
Write-Host "Created Type ID: $($egresoType.id)"

# 3. Create LIMON Value for INGRESO
Write-Host "Creating Catalogue Value: LIMON"
$limonValue = Invoke-RestMethod -Uri "$baseUrl/catalogue/values" -Method Post -Body (@{
    catalogueTypeId = $ingresoType.id
    code = "LIMON"
    name = "Limón"
    description = "Venta de Limón"
} | ConvertTo-Json) -ContentType "application/json"
Write-Host "Created Value ID: $($limonValue.id)"

# 4. Create JORNAL Value for EGRESO
Write-Host "Creating Catalogue Value: JORNAL"
$jornalValue = Invoke-RestMethod -Uri "$baseUrl/catalogue/values" -Method Post -Body (@{
    catalogueTypeId = $egresoType.id
    code = "JORNAL"
    name = "Jornal Diario"
    numericValue = 15
    description = "Pago por día de trabajo"
} | ConvertTo-Json) -ContentType "application/json"
Write-Host "Created Value ID: $($jornalValue.id)"

# 5. Create Worker
Write-Host "Creating Worker: Juan Perez"
$worker = Invoke-RestMethod -Uri "$baseUrl/workers" -Method Post -Body (@{
    firstName = "Juan"
    lastName = "Perez"
} | ConvertTo-Json) -ContentType "application/json"
Write-Host "Created Worker ID: $($worker.id)"

# 6. Create Income Transaction (Lemon Sale)
Write-Host "Creating Income Transaction: Venta de 10 sacos de Limón"
$incomeTx = Invoke-RestMethod -Uri "$baseUrl/transactions" -Method Post -Body (@{
    date = (Get-Date).ToString("yyyy-MM-ddTHH:mm:ssZ")
    type = "INCOME"
    categoryId = $limonValue.id
    quantity = 10
    unitPrice = 5.50
    totalAmount = 55.00
    notes = "Venta del día Lunes"
} | ConvertTo-Json) -ContentType "application/json"
Write-Host "Created Income Tx ID: $($incomeTx.id)"

# 7. Create Expense Transaction (Worker Payment)
Write-Host "Creating Expense Transaction: Pago a Juan Perez"
$expenseTx = Invoke-RestMethod -Uri "$baseUrl/transactions" -Method Post -Body (@{
    date = (Get-Date).ToString("yyyy-MM-ddTHH:mm:ssZ")
    type = "EXPENSE"
    categoryId = $jornalValue.id
    workerId = $worker.id
    quantity = 1
    unitPrice = 15.00
    totalAmount = 15.00
    notes = "Pago del día Lunes"
} | ConvertTo-Json) -ContentType "application/json"
Write-Host "Created Expense Tx ID: $($expenseTx.id)"

# 8. Get Dashboard Stats
Write-Host "Getting Dashboard Stats"
$stats = Invoke-RestMethod -Uri "$baseUrl/transactions/stats" -Method Get
Write-Host "Stats: $($stats | ConvertTo-Json)"

if ($stats.income -eq 55 -and $stats.expense -eq 15 -and $stats.balance -eq 40) {
    Write-Host "VERIFICATION SUCCESS: Stats match expected values."
} else {
    Write-Host "VERIFICATION FAILED: Stats do not match."
}
