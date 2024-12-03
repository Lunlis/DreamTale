/*:
 * @target MZ
 * @plugindesc Показывает текст чуть выше середины экрана, который исчезает через определенное время, с подчеркиванием текста.
 * @command ShowCenteredText
 * @text Показать текст
 * @desc Показывает текст в центре экрана с подчеркиванием, который автоматически исчезает.
 *
 * @arg message
 * @type string
 * @text Сообщение
 * @desc Текст, который вы хотите отобразить.
 *
 * @arg duration
 * @type number
 * @text Длительность
 * @desc Время в кадрах, в течение которого текст будет отображаться (60 кадров = 1 секунда)
 * @default 120
 */

(() => {
    const pluginName = "ShowText";

    PluginManager.registerCommand(pluginName, "ShowCenteredText", args => {
        const message = String(args.message);
        const duration = Number(args.duration);

        const sprite = new Sprite(new Bitmap(Graphics.width, Graphics.height));
        sprite.bitmap.fontSize = 28;

        const x = 0;
        const y = Graphics.height / 3 - 50;
        const maxWidth = Graphics.width;
        const textHeight = 48;

        sprite.bitmap.drawText(message, x, y, maxWidth, textHeight, "center");

        // Добавляем подчеркивание
        const textWidth = sprite.bitmap.measureTextWidth(message);
        const underlineY = y + 36; // выставляем позицию линии ниже текста
        const underlineThickness = 2;
        const underlineX = (Graphics.width - textWidth) / 2;

        sprite.bitmap.fillRect(underlineX, underlineY, textWidth, underlineThickness, sprite.bitmap.textColor);

        SceneManager._scene.addChild(sprite);

        const fadeOut = () => {
            const fadeSpeed = 4;
            const fadeInterval = setInterval(() => {
                sprite.opacity -= fadeSpeed;
                if (sprite.opacity <= 0) {
                    SceneManager._scene.removeChild(sprite);
                    clearInterval(fadeInterval);
                }
            }, 16);
        };

        setTimeout(fadeOut, duration * 16.67); // duration в кадрах
    });
})();