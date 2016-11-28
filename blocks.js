/*WALL*/
var brickRowCount = 3;
var brickColumnCount = 7;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var maxBricksHeight = 5;
var maxBricksWidth = 7;
//var bricks = [];
var bricks; //this is the brick data.
var lastCount = 0; //this is the last total for number of remaining bricks to destroy before next level!


var levelIsLoaded = false;
loadLevels();

function levelsListener()
{

	//console.log(this.responseText);
	bricks = JSON.parse(this.responseText);
	//console.log("bricks.levels.level = "+bricks.levels[0].level);

	levelIsLoaded = true;
}

function getLevels()
{
	var lRequest = new XMLHttpRequest();
	lRequest.addEventListener("load",levelsListener);
	lRequest.open("GET","data.json");
	lRequest.send();
}



function loadLevels()
{

	getLevels();
}

/*****************************************************************************
This function creates an empty level to be populated by data from the level
data json file(s)

*****************************************************************************/
function drawbrick(ctx,x,y,t,hp)
{
	if (t==1) //normal brick
	{
		if (hp==1) //1 hp brick
		{
			ctx.beginPath();
			ctx.rect(
				x,
				y,
				brickWidth,brickHeight);
			ctx.fillStyle = "#0095DD";
			ctx.fill();
			ctx.closePath();
		} else if (hp == 2) //2 hp brick
		{
			ctx.beginPath();
			ctx.rect(
				x,
				y,
				brickWidth,brickHeight);
			ctx.fillStyle = "#006588";
			ctx.fill();
			ctx.closePath();
		}
	} else if (t>99)//this is a despawning brick
	{
		//we use an if (t>n) structure to decide which frame to draw. t can be
		//set to a high value (there should be 100 frames/second)

	}
}

function drawBricks(ctx,lvl)
{
	if (levelIsLoaded)
	{
		for (c=0; c<brickColumnCount; c++)
		{
			for (r=0; r<brickRowCount; r++)
			{
				if (bricks.levels[lvl]["data"][c+(r*brickColumnCount)]["hp"]>0)
				{
					/*var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
					var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
					bricks[c][r].x = brickX;
					bricks[c][r].y = brickY;*/
					drawbrick(ctx,
					bricks.levels[lvl]["data"][c+(r*brickColumnCount)].x,
					bricks.levels[lvl]["data"][c+(r*brickColumnCount)].y,
					bricks.levels[lvl]["data"][c+(r*brickColumnCount)].type,
					bricks.levels[lvl]["data"][c+(r*brickColumnCount)].hp);
					/*
					ctx.beginPath();
					ctx.rect(
						bricks.levels[0]["data"]
						[c+(r*brickColumnCount)].x,
						bricks.levels[0]["data"]
						[c+(r*brickColumnCount)].y,brickWidth,brickHeight);
					ctx.fillStyle = "#0095DD";
					ctx.fill();
					ctx.closePath();*/
				}
			}
		}
	}
}

function collisionDetection(x,y,lvl)
{
		if (levelIsLoaded)
		{
			lastCount = 0;
			for(c=0; c<brickColumnCount; c++)
			{
				for (r=0; r<brickRowCount; r++)
				{
					//calculations
					var b = bricks.levels[lvl].data[c+(r*brickColumnCount)];
					if (b.hp>0)
					{
						if (((x>b.x) && (x<b.x+brickWidth)) && ((y>b.y) && (y<b.y+brickHeight)))
						{
							dy= -dy;
							b.hp--;
							if (b.hp>0)
							{
								lastCount++;
							}
							score++
						}
						else
						{
							lastCount++;
						}
					}
				}
			}
		}
}
