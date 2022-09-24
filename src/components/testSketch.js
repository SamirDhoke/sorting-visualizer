function draw(p5, props) {
    return () => {
        // the draw code
        // console.log('Index now at', props.index);
        
        if (props.index >= props.animations.length) {
            
            // console.log('Stopping the loop.', props.index);
            p5.noLoop();

        } else {            
            
            const anim = props.animations[props.index];
            
            // console.log('ANIM', anim);
            
            const { type, data } = anim;            

            if (type === 'COMPARE') {
                p5.fill('black');
                p5.rect(data[0] * 8, 0, 8, props.unsorted[data[0]] * 4)
                p5.rect(data[1] * 8, 0, 8, props.unsorted[data[1]] * 4)
                
                p5.fill('red');
                p5.rect(data[0] * 8, 0, 8, props.unsorted[data[0]] * 4)
                p5.rect(data[1] * 8, 0, 8, props.unsorted[data[1]] * 4)
            }
            
            if (type === 'SWAP') {                
                p5.fill('black');
                p5.rect(data[0] * 8, 0, 8, props.unsorted[data[0]] * 4)
                p5.rect(data[1] * 8, 0, 8, props.unsorted[data[1]] * 4)
                
                const temp = props.unsorted[data[0]];
                props.unsorted[data[0]] = props.unsorted[data[1]]
                props.unsorted[data[1]] = temp;
                
                p5.fill('orange');
                p5.rect(data[0] * 8, 0, 8, props.unsorted[data[0]] * 4)
                p5.fill('yellow');
                p5.rect(data[1] * 8, 0, 8, props.unsorted[data[1]] * 4)

            }
            
            if (type === 'SORTED') {
                p5.fill('green');
                p5.rect(data * 8, 0, 8, props.unsorted[data] * 4)            
            }

            if (type === 'RESET') {
                p5.fill('black');
                p5.rect(data[0] * 8, 0, 8, props.unsorted[data[0]] * 4)
                p5.rect(data[1] * 8, 0, 8, props.unsorted[data[1]] * 4)
                
                p5.fill('white');
                p5.rect(data[0] * 8, 0, 8, props.unsorted[data[0]] * 4)
                p5.rect(data[1] * 8, 0, 8, props.unsorted[data[1]] * 4)
            }
        
            props.index += 1;
        }
    }
}

function setup(p5, props) {
    return () => {
        // the setup code
        p5.createCanvas(props.width, props.height);
        p5.background(0);

        for (let i = 0; i < props.unsorted.length; i ++) {
            p5.fill('white');
            p5.rect(i * 8, 0, 8, props.unsorted[i] * 4);
        }
    }
}

export default function sketch(p5) {
    let state = {
        animations: [],
        unsorted: [],
        width: 100,
        height: 100,
        index: 0
    } 

    p5.setup = setup(p5, state);

    p5.draw = draw(p5, state)

    p5.updateWithProps = ({config}) => {
        const appropriateProps = {
            ...state,
            height: config.height,
            width: config.width,
            animations: config.animations,
            unsorted: config.unsorted
        }

        if (config.speed) {
            console.log('CHANGING FRAME RATE', config.speed);
            p5.frameRate(Number(config.speed));
        }

        state = Object.assign(state, appropriateProps);
    }
}