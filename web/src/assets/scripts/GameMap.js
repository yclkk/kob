import { AcGameObject } from "./AcGameObjects";
import { Wall } from "./Wall";

export class GameMap extends AcGameObject {
    constructor(ctx, parent) {
        super();
        this.ctx = ctx;
        this.parent = parent;
        this.L = 0;  // 地图的一个单位的大小
        this.cols = 13;
        this.rows = 13;  // cols rows 可以自行调整，但是获取地图大小的方式不变
        this.walls_count = 40;
        this.walls = [];
    }
    // 判断连通性，用的Flood Fill算法
    check_connectivity(g, sx, sy, tx, ty) {
        if (sx == tx && sy == ty) return true;
        g[sx][sy] =  true;
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
              		2. 为了对称，需要g[r][c], g[c][r]同时判断
              		3. 第二个if是为了将左下和右上的点排出
              	*/
                let r = parseInt(Math.random() * this.rows);
                let c = parseInt(Math.random() * this.cols);
                if (g[r][c] || g[c][r]) continue;
                if (r == 1 && c == this.cols - 2 || r == this.rows - 2 && c == 1) continue;
                g[r][c] = g[c][r] = true;
                break; 
            }
        }
        
        /*
            小技巧：利用JSON之间的转换实现深拷贝，这是怕在搜索的过程中影响了原来了g
            如果连同不了，那这个图就不生成了，需要重新刷新页面
        */

        const copy_g = JSON.parse(JSON.stringify(g));
        if (!this.check_connectivity(copy_g, 2, this.rows - 2, this.cols - 2, 2)) {
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

    start() {   
        
        // this.create_wall();
        // 如果上面墙的数量多了，这里可以增加i的循环次数，不建议写死循环
        // 如果生成成功，则不再执行
        for (let i = 0; i < 1000; i++) {
            if (this.create_wall()) {
                break;
            }
        }
    }

    update_size() {  // 更新地图，每一帧都要更新地图
        this.L = parseInt(Math.min(this.parent.clientWidth / this.cols, this.parent.clientHeight / this.rows));
        this.ctx.canvas.width = this.L * this.cols;
        this.ctx.canvas.height = this.L * this.rows;
    
    }

    update() {
        this.update_size();
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