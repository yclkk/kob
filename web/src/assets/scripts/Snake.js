import { AcGameObject } from "./AcGameObjects";
import { Cell } from "./Cell";


export class Snake extends AcGameObject{
    constructor(info, gamemap) {
        super();
        this.r = info.r;
        this.c = info.c;
        this.color = info.color;
        this.id = info.id;
        this.gamemap = gamemap;
        this.speed = 5;

        
        this.cells = [new Cell(info.r, info.c) ]
        this.next_cell = null; // 下一步的目标
        this.direction = -1;  // -1表示没有指令，0、1、2、3表示上右下左
        this.status = "idle";  // idle表示静止，move表示正在移动，die表示死亡

        this.dr = [-1, 0, 1, 0];  // 4个方向行的偏移量
        this.dc = [0, 1, 0, -1];  // 4个方向列的偏移量


        this.step = 0;
        this.eps = 1e-2;  // 允许的误差

        this.eye_direction = 0;
        if (this.id === 1) this.eye_direction = 2; // 左下角蛇头朝上，右上角朝下

        this.eye_dx = [     // 蛇的眼睛不同方向的偏移量 眼珠有两个
            [-1, 1],
            [1, 1],
            [1, -1],
            [-1, -1],
        ];
        this.eye_dy = [
            [-1, -1],
            [-1, 1],
            [1, 1],
            [1, -1],
        ];
    }

    start() {

    }

    set_direction(d) {
        this.direction = d;
    }

    check_tail_increasing() {  // 检测当前回合，蛇的长度是否增加
        if (this.step < 10) return true;
        if (this.step % 3 === 1) return true;
        return false;   
    } 


    next_step() {  // 蛇的状变为走下一步
        const d = this.direction;
        this.next_cell = new Cell(this.cells[0].r + this.dr[d], this.cells[0].c + this.dc[d]);
        this.eye_direction = d;
        this.direction = -1;  // 清空状态
        this.status = "move";
        this.step ++;
        const k = this.cells.length;  // 求小球的数量
        // 每一位小球都向后移动一位
        for (let i = k; i > 0; i--) { 
            // 第一个不用，就可以产生头部多了一个自己的复制
            this.cells[i] = JSON.parse(JSON.stringify(this.cells[i - 1]));
        }

        if (!this.gamemap.check_valid(this.next_cell)) { // 下一步操作非法，蛇死亡
            this.status = "die";
        }
    }



    update_move() {
        // this.cells[0].x += this.speed * this.timedelta / 1000;
        const dx = this.next_cell.x - this.cells[0].x;
        const dy = this.next_cell.y - this.cells[0].y;
        const distance = Math.sqrt(dx * dx + dy * dy);  // 走完一格的距离，所以可以用dx dy distance求角度

        // 判断是不是走到了终点，当两个点足够接近的时候就认为已经走在一块了
        if (distance < this.eps) {  // 移到了目标点，应该停下来
            this.cells[0] = this.next_cell;  // 把目标点存下来作为新的头
            this.next_cell = null;
            this.status = "idle";

            if (!this.check_tail_increasing()) {
                this.cells.pop();  // 长度不变，最后一个往前挪了，需要砍掉最后一个
            }
        } else {  // 不重合
            const move_distance = this.speed * this.timedelta / 1000; // 实际走的距离
            this.cells[0].x += move_distance * dx / distance;
            this.cells[0].y += move_distance * dy / distance;

            if (!this.check_tail_increasing()) {  // 蛇尾的长度不增加
                const k = this.cells.length;
                const tail = this.cells[k - 1], tail_target = this.cells[k - 2];
                const tail_dx = tail_target.x - tail.x ;
                const tail_dy = tail_target.y - tail.y ;
                tail.x += move_distance * tail_dx / distance;
                tail.y += move_distance * tail_dy / distance; // 因为头尾是一起动的，所以距离通用



            }
        }
    }
    update() {
        if (this.status === "move") {
            this.update_move();
        }
        this.render();
    }

    render() {
        const L = this.gamemap.L;
        const ctx = this.gamemap.ctx;
        if (this.status === "die") {
            this.color = "white";
        } 
        ctx.fillStyle = this.color;
        for (const cell of this.cells) {
            
            ctx.beginPath();
            ctx.arc(L * cell.x, L * cell.y, L / 2 * 0.8, 0, Math.PI * 2);
            ctx.fill(); // 填充颜色
        }

        for (let i = 1; i < this.cells.length; i++) {
            const a = this.cells[i - 1], b = this.cells[i];
            if (Math.abs(a.x - b.x) < this.eps && Math.abs(a.y - b.y) < this.eps) continue;
            if (Math.abs(a.x - b.x) < this.eps) {
                ctx.fillRect((a.x - 0.4) * L, Math.min(a.y, b.y) * L, L * 0.8, Math.abs(a.y - b.y) * L);
            } else {
                ctx.fillRect(Math.min(a.x, b.x) * L, (a.y - 0.4) * L, Math.abs(a.x - b.x) * L, L * 0.8 );
            }
        }

        for (let i = 0; i < 2; i ++) {
            ctx.fillStyle = "black";
            const eye_x = (this.cells[0].x + this.eye_dx[this.eye_direction][i] * 0.15) * L;
            const eye_y = (this.cells[0].y + this.eye_dy[this.eye_direction][i] * 0.15) * L;
            ctx.beginPath();
            ctx.arc(eye_x, eye_y, 0.05 * L, 0, Math.PI * 2);
            ctx.fill();
        }
    }

}