import { AcGameObject } from "./AcGameObjects";
import { Wall } from "./Wall";
import { Snake } from './Snake';

export class GameMap extends AcGameObject {
    constructor(ctx, parent) {
        super();
        this.ctx = ctx;
        this.parent = parent;
        this.L = 0;  // 地图的一个单位的大小
        this.rows = 13;  // cols rows 可以自行调整，但是获取地图大小的方式不变
        this.cols = 14;
        this.walls_count = 2;
        this.walls = [];
        this.snakes = [
            new Snake({id: 0, color: "#4876EC", r: this.rows - 2, c: 1}, this),
            new Snake({id: 1, color: "#F94848", r: 1, c: this.cols - 2}, this),

        ]
    }

    

    // 判断连通性，用的Flood Fill算法
    check_connectivity(g, sx, sy, tx, ty) {
        if (sx == tx && sy == ty) return true;
        g[sx][sy] = true;
        
        let dx = [-1, 0, 1, 0], dy = [0, 1, 0, -1];
        for (let i = 0; i < 4; i++) {
            let x = sx + dx[i], y = sy + dy[i];
            if (!g[x][y] && this.check_connectivity(g, x, y, tx, ty)) {
                return true;
            }
        }
        return false;
    }

    create_wall() {
        const g = [];
        for (let r = 0; r < this.rows; r ++) {
            g[r] = [];
            for (let c = 0; c < this.cols; c++) {
                g[r][c] = false;
            }
        }
        for (let r = 0; r < this.rows; r++) {
            g[r][0] = g[r][this.cols - 1] = true;
        }
        
        for (let c = 0; c < this.cols; c ++) {
            g[0][c] = g[this.rows - 1][c] = true;
        }
        
        for (let i = 0; i < this.walls_count; i++) {
            for (let j = 0; j < 1000; j++) {
                /*
              		1. 循环1000次是为了保证随机能够随机生成成功，不建议死循环，容易写不好把浏览器卡死
              		2. 为了对称，需要g[r][c], g[c][r]同时判断，后续改为中心对称 
              		3. 第二个if是为了将左下和右上的点排出
              	*/

                let r = parseInt(Math.random() * this.rows);
                let c = parseInt(Math.random() * this.cols);
                if (g[r][c] || g[this.rows - 1 - r][this.cols - 1 - c]) {
                    continue;
                }
                if (r == 1 && c == this.cols - 2 || r == this.rows - 2 && c == 1) {
                    continue;
                }
                g[r][c] = g[this.rows - 1 - r][this.cols - 1 - c] = true;
                break; 
            }
        }
        
        /*
            小技巧：利用JSON之间的转换实现深拷贝，这是怕在搜索的过程中影响了原来了g
            如果连同不了，那这个图就不生成了，需要重新刷新页面  
        */

        const copy_g = JSON.parse(JSON.stringify(g));
        if (!this.check_connectivity(copy_g,  this.rows - 2, 1, 1, this.cols - 2 )) {
             return false;
        }


        for (let r = 0; r < this.rows; r ++) {
            for (let c = 0; c < this.cols; c ++) {
                if (g[r][c]) {  
                    this.walls.push(new Wall(r, c, this));
                }
            }
        }
        return true;
    }
    add_listening_events() {
        this.ctx.canvas.focus();

        const [snake0, snake1] = this.snakes;
        this.ctx.canvas.addEventListener("keydown", e => {
            if (e.key === 'w') snake0.set_direction(0);
            else if (e.key === 'd') snake0.set_direction(1);
            else if (e.key === 's') snake0.set_direction(2);
            else if (e.key === 'a') snake0.set_direction(3);
            else if (e.key === 'ArrowUp') snake1.set_direction(0);
            else if (e.key === 'ArrowRight') snake1.set_direction(1);
            else if (e.key === 'ArrowDown') snake1.set_direction(2);
            else if (e.key === 'ArrowLeft') snake1.set_direction(3);
        });
    }


    start() {   
        
        // this.create_wall();
        // 如果上面墙的数量多了，这里可以增加i的循环次数，不建议写死循环
        // 如果生成成功，则不再执行
        for (let i = 0; i < 1000; i++) {
            if (this.create_wall()) {
                break;
            }
        }
        this.add_listening_events();
    } 

    update_size() {  // 更新地图，每一帧都要更新地图
        this.L = parseInt(Math.min(this.parent.clientWidth / this.cols, this.parent.clientHeight / this.rows))  ;
        this.ctx.canvas.width = this.L * this.cols;
        this.ctx.canvas.height = this.L * this.rows;
    
    }

    check_ready() {  // 判断两条蛇是否都准备好下一回合了
        for (const snake of this.snakes) {
            if (snake.status !== "idle") return false;
            if (snake.direction === -1) return false;
        }
        return true;
    }

    check_valid(cell) {
        for (const wall of this.walls) {
            if (cell.r === wall.r && cell.c === wall.c) {
                return false;
            }
        }
        for (const snake of this.snakes) {
            let k = snake.cells.length;
            if (!snake.check_tail_increasing()) {// 当蛇尾会前进的时候，蛇尾不要判断
                k--;
            }
            for (let i = 0; i < k; i ++) {
                if (snake.cells[i].r === cell.r && snake.cells[i].c === cell.c) {
                    return false;
                }
            }
        }
        return true;
    }


    next_step() {  // 让两条蛇进入下一回合
        for (const snake of this.snakes) {
            snake.next_step();
        }
    }
 
    update() {
        this.update_size();
        if (this.check_ready()) {
            this.next_step();
        }
        this.render();
    }


    render() {  // 渲染出来
        const color_even = "#AAD751", color_odd = "#A2D149";
        for (let r = 0; r < this.rows; r ++) {
            for (let c = 0; c < this.cols; c++) {
                if ((c + r) % 2 == 0) {
                    this.ctx.fillStyle = color_even;
                } else {
                    this.ctx.fillStyle = color_odd;
                }
                this.ctx.fillRect(this.L * c, this.L * r, this.L, this.L);
            }
        }
    }
}