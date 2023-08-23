import cv2
import numpy as np


def add_transparent_frame(img):
    height, width, _ = img.shape
    max_dim = max(height, width)

    # Erstellen Sie ein transparentes Quadrat
    square_img = np.zeros((max_dim, max_dim, 4), dtype=np.uint8)

    # Die Position, an der das Bild platziert werden soll, berechnen
    y_offset = (max_dim - height) // 2
    x_offset = (max_dim - width) // 2

    # Originalbild in das Quadrat einfügen
    square_img[y_offset:y_offset + height, x_offset:x_offset + width, :3] = img
    square_img[y_offset:y_offset + height, x_offset:x_offset + width,
    3] = 255  # Setze den Alpha-Wert auf 255 (nicht transparent)

    return square_img


def process_image(image_path, output_path):
    # Bild einlesen
    image = cv2.imread(image_path, cv2.IMREAD_COLOR)

    # Transparenten Rahmen hinzufügen
    image_with_frame = add_transparent_frame(image)

    # Bild in Graustufen umwandeln
    gray = cv2.cvtColor(image_with_frame, cv2.COLOR_BGR2GRAY)

    # Gaußsche Unschärfe anwenden
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)

    # Kanten erkennen mit Canny
    edges = cv2.Canny(blurred, 100, 200)

    # Dilatation anwenden, um die Kanten zu verbreitern
    kernel_size = 5
    kernel = np.ones((kernel_size, kernel_size), np.uint8)
    dilated_edges = cv2.dilate(edges, kernel, iterations=4)

    # Umkehren des Bildes (invertieren)
    inverted_edges = cv2.bitwise_not(dilated_edges)

    # Die schwarzen Pixel in rgb(112, 0, 0) umwandeln und dann alle weißen Flächen in Weiß lassen
    height, width = inverted_edges.shape
    output_image = np.zeros((height, width, 3), dtype=np.uint8) + 255

    for i in range(height):
        for j in range(width):
            if inverted_edges[i][j] == 0:
                output_image[i][j] = [0, 0, 112]  # OpenCV verwendet BGR anstatt RGB

    # Das bearbeitete Bild speichern
    cv2.imwrite(output_path, output_image)

# Pfad zu Ihrem Bild und Ausgabepfad
image_path = r'C:\Users\nwolf\Downloads\Vogel.png'
output_path = r'C:\Users\nwolf\Documents\GitHub\Semester02\TransferING\img\Vogel.jpg'

process_image(image_path, output_path)
