# clean.ps1
$folders = @(".vite", ".turbo", "dist")

foreach ($folder in $folders) {
    if (Test-Path $folder) {
        Remove-Item -Recurse -Force $folder
        Write-Host "Supprimé: $folder"
    } else {
        Write-Host "Non trouvé: $folder"
    }
}

Write-Host "Nettoyage terminé !"
