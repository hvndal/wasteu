import cv2
import numpy as np
import os

img_path = r"C:\Users\herma\.gemini\antigravity\brain\c1aecd22-14d2-4685-8323-5eec80b289e0\media__1783511094406.png"
out_dir = r"c:\Users\herma\Videos\WasteUniverse\assets\images"

img = cv2.imread(img_path)
if img is None:
    print("Could not read image")
    exit(1)

gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
gray = cv2.medianBlur(gray, 5)

circles = cv2.HoughCircles(gray, cv2.HOUGH_GRADIENT, dp=1.2, minDist=100,
                           param1=50, param2=30, minRadius=20, maxRadius=100)

if circles is not None:
    circles = np.round(circles[0, :]).astype("int")
    # Sort circles top-to-bottom, left-to-right (roughly)
    # y // 150 quantizes the y-coordinate into rows
    circles = sorted(circles, key=lambda c: (c[1] // 150, c[0]))
    
    for i, (x, y, r) in enumerate(circles):
        m = 2 # margin
        x1 = max(0, x - r - m)
        y1 = max(0, y - r - m)
        x2 = min(img.shape[1], x + r + m)
        y2 = min(img.shape[0], y + r + m)
        
        cropped = img[y1:y2, x1:x2]
        out_path = os.path.join(out_dir, f"extracted_{i}.png")
        cv2.imwrite(out_path, cropped)
        print(f"Saved {out_path} (x={x}, y={y}, r={r})")
else:
    print("No circles found.")
