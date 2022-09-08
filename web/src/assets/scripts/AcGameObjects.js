
const AC_GAME_OBJECTS = [];

export class AcGameObject {
    
    constructor() {
        AC_GAME_OBJECTS.push(this);
        this.has_celled_start = false;
        this.timedelta = 0;

    }

    start() {  // 开始时执行一次

    }

    update() {  // 在start之后每一帧执行一次
        
    }

    on_destroy() {  // 删除之前调用

    }

    destroy() { // 
        this.on_destroy();
        
        for (let i in AC_GAME_OBJECTS) {
            if (this == AC_GAME_OBJECTS[i]) {
                AC_GAME_OBJECTS.splice(i);
                break;
            } 
        }
    }
}
let last_timestamp;

const step = (timestamp) => {
    for (let obj of AC_GAME_OBJECTS) {
        if (!obj.has_celled_start) {
            obj.has_celled_start = true;
            obj.start();
        } else {
            obj.timedelta = timestamp - last_timestamp;
            obj.update();
        }
    }
    last_timestamp = timestamp;
    requestAnimationFrame(step);

} 


requestAnimationFrame(step);