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
    
    # Save as JPEG high quality
    $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
    $encoderParams = [System.Drawing.Imaging.EncoderParameters]::new(1)
    $encoderParams.Param[0] = [System.Drawing.Imaging.EncoderParameter]::new([System.Drawing.Imaging.Encoder]::Quality, [long]92)
    $bmp.Save($destPath, $codec, $encoderParams)
    $bmp.Dispose()
    Write-Host "Cropped $sourcePath ($w x $h) -> $destPath"
}

$dir = "d:\ad-landing-page-14-11-26\mira\assets\images"
New-Item -ItemType Directory -Path "$dir\clean" -Force | Out-Null

# 1. img_2: Left half is photo (4096 x 2907) -> x:0, y:0, w:2048, h:2907
Crop-Image "$dir\img_2.jpg" "$dir\clean\hillside_hero.jpg" 0 0 2048 2907

# 2. img_8: Left half is Elie Saab lounge (4096 x 2907) -> x:0, y:0, w:2048, h:2907
Crop-Image "$dir\img_8.jpg" "$dir\clean\elie_saab_residence.jpg" 0 0 2048 2907

# 3. img_11: Living room sunset skyline (4096 x 2906) -> clean panoramic photo!
Crop-Image "$dir\img_11.jpg" "$dir\clean\living_room_skyline.jpg" 0 0 4096 2906

# 4. img_17: Masterplan aerial (Left ~70% is the pure hillside masterplan)
# Width is 4096, height is 2906. Left 2850px is the aerial hillside rendering!
Crop-Image "$dir\img_17.jpg" "$dir\clean\masterplan_aerial.jpg" 0 0 2850 2906

# 5. img_20: Villa interior with fireplace overlooking hills (Left half is photo)
Crop-Image "$dir\img_20.jpg" "$dir\clean\villa_terrace.jpg" 0 0 2048 2906

# 6. img_22: Hillside villas at sunset (Landscape for well-being) - crop bottom text if any
# Let's crop x:0, y:0, w:4096, h:2905
Crop-Image "$dir\img_22.jpg" "$dir\clean\hillside_villas_sunset.jpg" 0 0 4096 2905

# 7. img_23: Terraced hillside residences with cantilever decks
# Let's crop x:0, y:0, w:4096, h:2906
Crop-Image "$dir\img_23.jpg" "$dir\clean\cantilever_villas.jpg" 0 0 4096 2906

# 8. img_25: Pedestrian green street with modern timber villas (Left half is desk, Right half is street)
# Actually the street is from x:1000 to x:4096
Crop-Image "$dir\img_25.jpg" "$dir\clean\forest_townhouses_street.jpg" 1050 0 3046 2905

# 9. img_26: Illuminated evening pavilion (Left 50% is photo)
Crop-Image "$dir\img_26.jpg" "$dir\clean\evening_pavilion.jpg" 0 0 2048 2906

# 10. img_27: Hillside masterplan aerial (Left 55% is pure rendering: x:0, y:0, w:2250, h:2905)
Crop-Image "$dir\img_27.jpg" "$dir\clean\investment_aerial.jpg" 0 0 2250 2905

# 11. img_28: Illuminated nighttime retail promenade & dining
Crop-Image "$dir\img_28.jpg" "$dir\clean\retail_promenade_night.jpg" 0 0 4096 2905

# 12. img_19: Where the hills meet the city (let's crop the pure architectural rendering without text if needed)
Crop-Image "$dir\img_19.jpg" "$dir\clean\tbilisi_skyline_dusk.jpg" 0 500 4096 2405

Write-Host "All clean photos cropped successfully!"
