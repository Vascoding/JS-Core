let classes = require('./Computer')

let Battery = classes.Battery
let Computer = classes.Computer
let Desktop = classes.Desktop
let Keyboard = classes.Keyboard
let Laptop = classes.Laptop
let Monitor = classes.Monitor

function createMixins() {
    function computerQualityMixin(classToExtend) {
        classToExtend.prototype.getQuality = function () {
            return (this.processorSpeed + this.ram + this.hardDiskSpace) / 3
        }

        classToExtend.prototype.isFast = function () {
            return this.processorSpeed > (this.ram / 4)
        }

        classToExtend.prototype.isRoomy = function () {
            return this.hardDiskSpace > Math.floor(this.ram * this.processorSpeed)
        }
    }

    function styleMixin(classToExtend) {
        classToExtend.prototype.isFullSet = function () {
            return this.manufacturer === this.keyboard.manufacturer && this.manufacturer === this.monitor.manufacturer
        }

        classToExtend.prototype.isClassy = function () {
            return this.expectedLife >= 3 && this.color === 'Silver' || 'Black' && this.weight < 3
        }
    }

    return {
        computerQualityMixin,
        styleMixin
    }
}

let style = createMixins()

style.styleMixin(Desktop)
let keyboard = new Keyboard('JAR Computers', 12)
let monitor = new Monitor('JAR Computers', 23)
let desktop = new Desktop("JAR Computers",3.3,8,1,keyboard,monitor)
console.log(desktop.isFullSet())