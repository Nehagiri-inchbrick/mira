Add-Type -AssemblyName System.Drawing

function Crop-Image($sourcePath, $destPath, $x, $y, $w, $h) {
    $src = [System.Drawing.Image]::FromFile($sourcePath)
    $rect = [System.Drawing.Rectangle]::new($x, $y, $w, $h)
    $bmp = [System.Drawing.Bitmap]::new($w, $h)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.DrawImage($src, 0, 0, $rect, [System.Drawing.GraphicsUnit]::Pixel)
    $g.Dispose()
    $src.Dispose()
    
    $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
    $encoderParams = [System.Drawing.Imaging.EncoderParameters]::new(1)
    $encoderParams.Param[0] = [System.Drawing.Imaging.EncoderParameter]::new([System.Drawing.Imaging.Encoder]::Quality, [long]92)
    $bmp.Save($destPath, $codec, $encoderParams)
    $bmp.Dispose()
    Write-Host "Done: $destPath"
}

$dir = "d:\ad-landing-page-14-11-26\mira\assets\images"

# 1. retail_promenade_night (y:400 to remove top MIRA VERDE text)
Crop-Image "$dir\img_28.jpg" "$dir\clean\retail_promenade_night.jpg" 0 400 4096 2505

# 2. aerial_masterplan_clean (from img_1, cropping inside the photo frame)
Crop-Image "$dir\img_1.jpg" "$dir\clean\aerial_masterplan_clean.jpg" 288 1140 2310 1800

# 3. masterplan_night_clean (from img_7, y:450 to bottom to remove top text)
Crop-Image "$dir\img_7.jpg" "$dir\clean\masterplan_night_clean.jpg" 0 450 4096 2456

# 4. hillside_hero_banner (from img_2, left 2048px, horizontal banner crop)
# Let's crop a wide banner version from img_2!
# img_2 is 4096x2907, left 2048 is photo.
# Let's also crop a wide landscape banner from img_23: cantilever_villas is 4096x2056! That's a perfect wide banner!
# Let's also crop img_20 (villa_terrace) which is 2048x2906 pure photo.

Write-Host "All photos ready!"
