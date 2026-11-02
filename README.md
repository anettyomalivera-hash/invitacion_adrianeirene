# Invitación de bodas de oro

## Publicar

Publica `index.html`, `datos-privados.enc.json`, `cifrar-datos.mjs` y las imágenes de la invitación. No publiques `datos-privados.json` ni `.invite-key`; `.gitignore` los excluye de Git.

Comparte la URL normal de GitHub Pages. Envía el código guardado localmente en `.invite-key` en un mensaje separado y solo a los invitados; cada invitado lo ingresa en la página antes de habilitar la búsqueda y la confirmación. No agregues el código a la URL. Los enlaces antiguos que incluyen `?key=...` siguen funcionando, pero la página quita ese parámetro de la barra de direcciones después de validar el acceso.

La búsqueda de invitados no depende del número de WhatsApp. Si `whatsappNumero` no contiene entre 8 y 15 dígitos, se podrá buscar la mesa, pero la confirmación por WhatsApp permanecerá deshabilitada.

## Actualizar los datos

1. Edita `datos-privados.json` en este equipo.
2. Ejecuta `node cifrar-datos.mjs` para cifrar los datos con el código actual.
3. Publica el nuevo `datos-privados.enc.json` junto con la página.
4. Si el código pudo quedar expuesto, ejecuta `node cifrar-datos.mjs --rotate-key` y comparte el nuevo código por separado.
