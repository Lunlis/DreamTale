//=============================================================================
// Plugin Name: ShowTime
// Author: ilingin.prod
// Description: Выводит на экран данные о времени в формате: Часы: 0 Минуты: 0
// Use: Можете свободно использовать в личных и коммерческих проектах. Можете свободно редактировать. Пожалуйста, указывайте авторство.
//=============================================================================\

/*:
 * @target MZ
 * @plugindesc Используйте метод плагина ShowTime в параллельном событии для отображения времени.
 * @command ShowTime
 * @text Показать время
 * @desc Выводит на экран данные о времени в формате: Часы: 0 Минуты: 0
 * 
 * @arg hourID
 * @type number
 * @text Часы
 * @desc Часы
 *
 * @arg minutesID
 * @type number
 * @text Минуты
 * @desc Минуты
 * 
 * @param x
 * @text Позиция X
 * @type number
 * @desc Позиция X для отображения.
 * @default 20
 * 
 * @param y
 * @text Позиция Y
 * @type number
 * @desc Позиция Y для отображения.
 * @default 20
 */

(() => {
    const parameters = PluginManager.parameters('ShowTime');
    const dayID = Number(parameters['dayID'] || 3); //Переменна №0003 Days
    const hourID = Number(parameters['hourID'] || 2); //Переменна №0002 Hours
    const minutesID = Number(parameters['minutesID'] || 1); //Переменна №0001 Minutes
    const posX = Number(parameters['x'] || 0);
    const posY = Number(parameters['y'] || 0);

    const _Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
    Scene_Map.prototype.createAllWindows = function() {
        _Scene_Map_createAllWindows.call(this);
        this.createVariableValueWindow();
    };

    Scene_Map.prototype.createVariableValueWindow = function() {
        const width = 400; // ширина окна
        const height = 60; // высота окна
        this._variableValueWindow = new Window_Base(new Rectangle(posX, posY, width, height));
        this.addWindow(this._variableValueWindow);
        this.updateVariableValueWindow();
    };

    Scene_Map.prototype.updateVariableValueWindow = function() {
        let day = $gameVariables.value(dayID);
        let hour = $gameVariables.value(hourID);
        let minutes = $gameVariables.value(minutesID);
        this._variableValueWindow.contents.clear();
        this._variableValueWindow.drawText('Дни: ' + day +'  Часы: ' + hour + '  Минуты: ' + minutes, 0, 0);
    };

    const _Scene_Map_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function() {
        _Scene_Map_update.call(this);
        this.updateVariableValueWindow();
    };
})();