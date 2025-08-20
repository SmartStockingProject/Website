function Convert-ToPascalCase($text) {
    Write-Host "`n[Debug] Raw input: '$text'" -ForegroundColor Cyan
    $words = $text -split '\s+'
    $pascalCase = ""
    foreach ($word in $words) {
        if ($word.Length -gt 0) {
            $pascalCase += $word.Substring(0,1).ToUpper() + $word.Substring(1).ToLower()
        }
    }
    Write-Host "[Debug] PascalCase result: '$pascalCase'" -ForegroundColor Cyan
    return $pascalCase
}

# קבלת קלט מהמשתמש
$taskId = Read-Host "Enter ClickUp Task ID (e.g. 86euh9ypn)"
$description = Read-Host "Enter branch description (e.g. creation of automatic branch format)"
$type = Read-Host "Enter branch type (e.g. script / feature / bugfix / hotfix)"

# עיבוד התיאור ל-PascalCase
$descPascal = Convert-ToPascalCase $description

# בניית שם הסניף
$branchName = "$type/$taskId-$descPascal"

# יצירת הסניף
git checkout -b $branchName

# פלט למשתמש
Write-Host "`n✅ Branch created:" -ForegroundColor Green
Write-Host "$branchName" -ForegroundColor Yellow
