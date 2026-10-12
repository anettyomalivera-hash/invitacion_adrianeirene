# Invitación de bodas de oro

## Publicar

Publica `index.html`, `datos-privados.enc.json`, `cifrar-datos.mjs` y las imágenes de la invitación. No publiques `datos-privados.json` ni `.invite-key`; `.gitignore` los excluye de Git.

Comparte la URL normal de GitHub Pages. Envía el código que está guardado localmente en `.invite-key` en un mensaje separado y solo a los invitados. La página pide ese código antes de habilitar la búsqueda de mesa y la confirmación.

## Actualizar los datos

1. Edita `datos-privados.json` en este equipo.
2. Ejecuta `node cifrar-datos.mjs` para cifrar los datos con el código actual.
3. Publica el nuevo `datos-privados.enc.json` junto con la página.
4. Si el código pudo quedar expuesto, ejecuta `node cifrar-datos.mjs --rotate-key` y comparte el nuevo código por separado.

## Alcance

GitHub Pages no ofrece almacenamiento privado. El archivo publicado contiene datos cifrados que cualquier visitante puede descargar, pero no leer sin el código. Cuando un invitado autorizado los abre, el navegador los descifra localmente; una persona con conocimientos técnicos y el código podría extraerlos. No envíes el código en la URL ni lo publiques en GitHub.
