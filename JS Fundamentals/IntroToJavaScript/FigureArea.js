

function figureArea(w, h, W, H) {
    var firstArea = w * h;
    var secondArea = W * H;
    var innerArea = Math.min(w, W) * Math.min(h, H);

    console.log(firstArea + secondArea - innerArea);
}

console.log(figureArea(13, 2, 5, 8));