/*function main() 
{
    var kanvas = document.getElementById("kanvas");

    //inisialisasi variable yang digunakan untuk mengambar kanvas mengunakan gl(kanvas yang diwarnai)
    var gl = kanvas.getContext("webgl");

    var vertices = [
        0.5, 0.0, 0.1, 0.1, 1.65,   // A: kanan atas (CYAN)
        0.0, -0.5, 1.0, 0.0, 1.0,   // B: bawah tengah (MAGENTA)
        -0.5, 0.0, 0.0, 1.99, 0.0,  // C: kiri atas (YELLOW)
        0.0, 0.5, 0.0, 0.0, 0.0    // D: atas tengah (WHITE)
    ];

    //  vertices yang telah dibuat di pindahkan ke GPU dari CPU
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    // KOMPONEN-KOMPONEN PADA GLSL DAN JS
    // 1: attribute = variabel yang ada pada .glsl
    // 2: varying = variabel yang dapat dipassing dari vertex ke fragment dan sebaliknya
    // 3: uniform = variabel yang bisa dipassing dari js ke glsl vertex/fragment


    // Vertex Shader
    var vertexShaderCode = 
    `
    attribute vec2 aPosition;
    attribute vec3 aColor;
    uniform float uTheta;
    uniform float uDx;
    uniform float uDy;
    varying vec3 vColor; 
    void main()
    {
        float x = -sin(uTheta) * aPosition.x + cos(uTheta) * aPosition.y + uDx;
        float y = cos(uTheta) * aPosition.x + sin(uTheta) * aPosition.y + uDy;
        gl_PointSize = 10.0;
        gl_Position =  vec4(x, y, 0.0, 1.0); 
        // vec4. 4 di sana adalah yang dimaksud di ppt "setiap lambang 2,3,4 di vec yang menggambarkan dimensi"
        
        vColor = aColor;
    }
    `;
    var vertexShaderObject = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShaderObject, vertexShaderCode);
    gl.compileShader(vertexShaderObject); // menjadi .o


    // Fragment Shader
    var fragmentShaderCode = `
    precision mediump float;
    varying vec3 vColor;
    void main()
    {
        gl_FragColor = vec4(vColor, 1.0);
    }
    `;
    var fragmentShaderObject = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShaderObject, fragmentShaderCode);
    gl.compileShader(fragmentShaderObject); // menjadi .o

    var shaderProgram = gl.createProgram(); // wadah dari executable (.exe)

    gl.attachShader(shaderProgram, vertexShaderObject);  // kedua .o di atas dimasukkan ke dalam wadah
    gl.attachShader(shaderProgram, fragmentShaderObject);

    gl.linkProgram(shaderProgram);  // wadah diaduk (linking)
    gl.useProgram(shaderProgram);   // alat (kuas) yang digunakan

    // Variabel lokal
    var theta = 0.0;
    var dx = 0.0;
    var dy = 0.0;
    var freeze = false;

    // Variabel pointer ke GLSL
    var uTheta = gl.getUniformLocation(shaderProgram, "uTheta");
    var uDx = gl.getUniformLocation(shaderProgram, "uDx");
    var uDy = gl.getUniformLocation(shaderProgram, "uDy");

    // Memberitahu GPU cara mengoleksi nilai 
    // posisi dari ARRAY_BUFFER untuk setiap vertex yang sedang diproses 
    var aPosition = gl.getAttribLocation(shaderProgram, "aPosition");
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 
        5 * Float32Array.BYTES_PER_ELEMENT, 
        0 * Float32Array.BYTES_PER_ELEMENT); // array elemen ke-0
    gl.enableVertexAttribArray(aPosition);

    var aColor = gl.getAttribLocation(shaderProgram, "aColor");
    gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, 
        5 * Float32Array.BYTES_PER_ELEMENT, 
        2 * Float32Array.BYTES_PER_ELEMENT); // array elemen ke-2
    gl.enableVertexAttribArray(aColor);

    // Grafika interaktif
    // Tetikus
    function onMouseClick(event)
    {
        freeze = !freeze;
    }
    document.addEventListener("click", onMouseClick);

    // Papan ketuk
    function onKeyDown(event)
    {
        if (event.keyCode == 32) freeze = true;
        if (event.keyCode == 68) dx += 0.1;
        if (event.keyCode == 65) dx -= 0.1;
        if (event.keyCode == 87) dy += 0.1;
        if (event.keyCode == 83) dy -= 0.1;
    }
    function onKeyUp(event)
    {
        if (event.keyCode == 32) freeze = false;
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);


    function render()
    {
        setTimeout(function(){
            gl.clearColor(1.0, 0.65, 0, 1.0); // nilai warna :  "red, green, blue, alpha(opcity)"
            gl.clear(gl.COLOR_BUFFER_BIT);
    
            if (!freeze)
            {
                theta -= 0.1;
                gl.uniform1f(uTheta, theta); // uniform1f() -> mentransfer uniform 1 saja yg berupa float
    
            }
            gl.uniform1f(uDx, dx);
            gl.uniform1f(uDy, dy);

                // contoh pentransferan lain :
                /*var vector2D = [x, y];
                 gl.uniform2f(uTheta, vector2D[0], vector2D[1]);
                gl.uniform2fv(uTheta, vector2D);
                */
    /*
            gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
             // kecepatannya sama seperti clockspeed cpu

            requestAnimationFrame(render);
            //render(); 
        }, 1000/30); //  kecepatan peputaran 20 fps
    }
        //render() //
    requestAnimationFrame(render);
}
*/

function main() {
    var kanvas = document.getElementById("kanvas");
    var gl = kanvas.getContext("webgl");

    var vertices = [
        0.5, 0.0, 0.0, 1.0, 1.0,   // A: kanan atas    (BIRU LANGIT)
        0.0, -0.5, 1.0, 0.0, 1.0,  // B: bawah tengah  (MAGENTA)
        -0.5, 0.0, 1.0, 1.0, 0.0,  // C: kiri atas     (KUNING)
        0.0, 0.5, 1.0, 1.0, 1.0    // D: atas tengah   (PUTIH)
    ];

    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    // Vertex shader
    var vertexShaderCode =  `
    attribute vec2 aPosition;
    attribute vec3 aColor;
    uniform mat4 uModel;
    varying vec3 vColor;
    void main() {
        vec2 position = aPosition;
        gl_Position = uModel * vec4(position, 0.0, 1.0);
        vColor = aColor;
    }
    `;
    var vertexShaderObject = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShaderObject, vertexShaderCode);
    gl.compileShader(vertexShaderObject);   // sampai sini sudah jadi .o

    // Fragment shader
    var fragmentShaderCode = `
    precision mediump float;
    varying vec3 vColor;
    void main() {
        gl_FragColor = vec4(vColor, 1.0);
    }
    `;
    var fragmentShaderObject = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShaderObject, fragmentShaderCode);
    gl.compileShader(fragmentShaderObject);   // sampai sini sudah jadi .o

    var shaderProgram = gl.createProgram(); // wadah dari executable (.exe)
    gl.attachShader(shaderProgram, vertexShaderObject);
    gl.attachShader(shaderProgram, fragmentShaderObject);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    // Variabel lokal
    var theta = 0.0;
    var freeze = false;
    var horizontalSpeed = 0.0;
    var verticalSpeed = 0.0;
    var horizontalDelta = 0.0;
    var verticalDelta = 0.0;

    // Variabel pointer ke GLSL
    var uModel = gl.getUniformLocation(shaderProgram, "uModel");

    // Kita mengajari GPU bagaimana caranya mengoleksi
    //  nilai posisi dari ARRAY_BUFFER
    //  untuk setiap verteks yang sedang diproses
    var aPosition = gl.getAttribLocation(shaderProgram, "aPosition");
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 
        5 * Float32Array.BYTES_PER_ELEMENT, 
        0);
    gl.enableVertexAttribArray(aPosition);
    var aColor = gl.getAttribLocation(shaderProgram, "aColor");
    gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, 
        5 * Float32Array.BYTES_PER_ELEMENT, 
        2 * Float32Array.BYTES_PER_ELEMENT);
    gl.enableVertexAttribArray(aColor);

    // Grafika interaktif
    // Tetikus
    function onMouseClick(event) {
        freeze = !freeze;
    }
    document.addEventListener("click", onMouseClick);
    // Papan ketuk
    function onKeydown(event) {
        if (event.keyCode == 32) freeze = !freeze;  // spasi
        // Gerakan horizontal: a ke kiri, d ke kanan
        if (event.keyCode == 65) {  // a
            horizontalSpeed = -0.01;
        } else if (event.keyCode == 68) {   // d
            horizontalSpeed = 0.01;
        }
        // Gerakan vertikal: w ke atas, s ke bawah
        if (event.keyCode == 87) {  // w
            verticalSpeed = -0.01;
        } else if (event.keyCode == 83) {   // s
            verticalSpeed = 0.01;
        }
    }
    function onKeyup(event) {
        if (event.keyCode == 32) freeze = !freeze;
        if (event.keyCode == 65 || event.keyCode == 68) horizontalSpeed = 0.0;
        if (event.keyCode == 87 || event.keyCode == 83) verticalSpeed = 0.0;
    }
    document.addEventListener("keydown", onKeydown);
    document.addEventListener("keyup", onKeyup);

    function render() {
        gl.clearColor(1.0,      0.65,    0.0,    1.0);  // Oranye
        //            Merah     Hijau   Biru    Transparansi
        gl.clear(gl.COLOR_BUFFER_BIT);
        if (!freeze) {
            theta += 0.1;
        }
        horizontalDelta += horizontalSpeed;
        verticalDelta -= verticalSpeed;
        var model = glMatrix.mat4.create(); // Membuat matriks identitas
        glMatrix.mat4.translate(
            model, model, [horizontalDelta, verticalDelta, 0.0]
        );
        glMatrix.mat4.rotateZ(
            model, model, theta
        );
        gl.uniformMatrix4fv(uModel, false, model);
        gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}