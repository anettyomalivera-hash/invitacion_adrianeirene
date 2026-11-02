# Invitación de bodas de oro

## Publicar

Publica `index.html`, `datos-privados.enc.json`, `cifrar-datos.mjs` y las imágenes de la invitación. No publiques `datos-privados.json` ni `.invite-key`; `.gitignore` los excluye de Git.

Comparte con cada invitado el enlace personalizado con el código en el parámetro `?key=...`; no compartas la URL base. La página valida el enlace automáticamente, sin pedirle al invitado que escriba un código, y quita el parámetro de la barra de direcciones después de validar el acceso. Envía los enlaces en privado y no los publiques.

La búsqueda de invitados no depende del número de WhatsApp. Al seleccionar un nombre, la página muestra su mesa y la cantidad de pases asignados. Cada invitado en `datos-privados.json` debe incluir `nombre`, `mesa` y `pases`. Para confirmar, `whatsappNumero` debe ser un teléfono válido: un número mexicano local de 10 dígitos se convierte automáticamente al formato internacional de WhatsApp. Si el número no es válido, se podrá buscar la mesa, pero la confirmación permanecerá deshabilitada.

## Actualizar los datos

1. Edita `datos-privados.json` en este equipo.
2. Ejecuta `node cifrar-datos.mjs` para cifrar los datos con el código actual.
3. Publica el nuevo `datos-privados.enc.json` junto con la página.
4. Si el código pudo quedar expuesto, ejecuta `node cifrar-datos.mjs --rotate-key` y genera y comparte nuevos enlaces personalizados.
