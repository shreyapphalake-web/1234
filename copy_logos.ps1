Add-Type -AssemblyName System.Drawing
$destDir = "C:\Users\Samarth\.gemini\antigravity-ide\scratch\campusnest-kolhapur\public\images\colleges"

Copy-Item -Path "C:\Users\Samarth\Downloads\sanjay.png" -Destination "$destDir\sgi.png" -Force
Copy-Item -Path "C:\Users\Samarth\Downloads\ashok.png" -Destination "$destDir\ashokrao-mane.png" -Force
Copy-Item -Path "C:\Users\Samarth\Downloads\tkiet.png" -Destination "$destDir\tkiet.png" -Force
Copy-Item -Path "C:\Users\Samarth\Downloads\Dkte-Trans-logo.png" -Destination "$destDir\dkte.png" -Force
Copy-Item -Path "C:\Users\Samarth\Downloads\shrad.png" -Destination "$destDir\sharad-institute.png" -Force

$jpgPath = "C:\Users\Samarth\Downloads\DY-Patil-Technical-Campus-Talsande.jpg"
$pngPath = "$destDir\dyp-talsande.png"
$img = [System.Drawing.Image]::FromFile($jpgPath)
$img.Save($pngPath, [System.Drawing.Imaging.ImageFormat]::Png)
$img.Dispose()

Write-Host "Logos processed successfully:"
Get-ChildItem -Path $destDir | Select-Object Name, Length
