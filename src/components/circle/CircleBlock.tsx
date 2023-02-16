import React from 'react';
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/all';
import styles from './circle.module.scss';
import { ItemType } from '../../redux/slices/dataSlice';

type CircleBlockProps = {
  itemsArr: ItemType[];
  activeItem: number;
  onClick: (elem: number) => void;
};

export const CircleBlock: React.FC<CircleBlockProps> = (props) => {
  const tl = gsap.timeline({ paused: true, reversed: true });

  const [onClickPoint, setOnClickPoint] = React.useState<(elem: number) => void>(() => {});
  const [onClickNext, setOnClickNext] = React.useState<() => () => void>();
  const [onClickPrev, setOnClickPrev] = React.useState<() => () => void>();

  const circlePath = React.useRef<SVGPathElement | null>(null);
  const items = React.useRef<[HTMLDivElement] | []>([]);
  const tracker = { item: 0 };

  React.useEffect(() => {
    let length = 1;
    gsap.registerPlugin(MotionPathPlugin);

    let numItems = 0;
    if (items.current) {
      numItems = items.current.length;
      length = items.current.length;
    }
    let itemStep = 1 / numItems;

    const wrapTracker = gsap.utils.wrap(0, numItems);

    gsap.set(items.current, {
      motionPath: {
        path: circlePath.current,
        align: circlePath.current,
        alignOrigin: [0.5, 0.5],

        end: (i: number) => i / length,
      } as object,
      scale: 0.9,
    });

    tl.to('.wrapper', {
      rotation: 360,
      transformOrigin: 'center',
      duration: 1,
      ease: 'none',
    });

    tl.to(
      items.current,
      {
        rotation: '-=360',
        transformOrigin: 'center center',
        duration: 1,
        ease: 'none',
      },
      0,
    );

    tl.to(
      tracker,
      {
        item: numItems,
        duration: 1,
        ease: 'none',
        modifiers: {
          item: (value: number) => wrapTracker(numItems - Math.round(value)),
        },
      },
      0,
    );

    setOnClickPoint(
      () =>
        function (i: number) {
          let current = tracker.item;

          if (i === current) {
            return;
          }
          props.onClick(i);

          let diff = current - i;

          if (Math.abs(diff) < numItems / 2) {
            moveWheel(diff * itemStep);
          } else {
            let amt = numItems - Math.abs(diff);
            if (current > i) {
              moveWheel(amt * -itemStep);
            } else {
              moveWheel(amt * itemStep);
            }
          }
        },
    );
    setOnClickNext(
      () =>
        function () {
          return moveWheel(-itemStep);
        },
    );
    setOnClickPrev(
      () =>
        function () {
          return moveWheel(itemStep);
        },
    );
  }, []);

  function moveWheel(amount: number) {
    let numItems = items.current ? items.current.length : 1;

    let itemStep = 1 / numItems;
    const wrapProgress = gsap.utils.wrap(0, 1);
    const snap = gsap.utils.snap(itemStep);
    let progress = tl.progress();

    tl.progress(wrapProgress(snap(tl.progress() + amount)));
    let next = tracker.item;
    tl.progress(progress);

    props.onClick(next);

    gsap.to(tl, {
      progress: snap(tl.progress() + amount),
      modifiers: {
        progress: wrapProgress,
      },
    });
  }

  return (
    <div>
      <div>
        <div className={styles.container}>
          <div className={'wrapper'}>
            {props.itemsArr.map((elem, index) => {
              return (
                <div
                  onClick={() => onClickPoint(index)}
                  key={elem.Title + index}
                  // @ts-ignore
                  ref={(element) => (items.current[index] = element)}
                  className={`item  ${props.activeItem === index ? 'active' : ''}`}>
                  <i className="btn">{index}</i>
                  <div className="desc">{elem.Title}</div>
                </div>
              );
            })}

            <svg viewBox="0 0 300 300">
              <path
                ref={circlePath}
                className={styles.st0}
                id="circlePath"
                d="M226.2698 19.8264C297.9767 61.2264 322.5736 153.0233 281.1736 224.7302 239.7736 296.4371 147.9767 321.034 76.2698 279.634 4.5629 238.234-20.034 146.4371 21.366 74.7302 62.766 3.0233 154.5629-21.5736 226.2698 19.8264z"></path>
              <circle id="holder" className={styles.st0} cx="151" cy="151" r="150" />
            </svg>
          </div>
          <div className={styles.dates}>
            {`${props.itemsArr[props.activeItem].Dates[0].Data} ${
              props.itemsArr[props.activeItem].Dates[
                props.itemsArr[props.activeItem].Dates.length - 1
              ].Data
            }`}
          </div>
        </div>
      </div>

      <div className={styles.swiperCustom}>
        <div className={styles.btm_area}>
          <div className={styles.categiria_number}>{`${props.activeItem}/${
            props.itemsArr.length - 1
          }`}</div>
          <button onClick={onClickPrev} className={styles.btn_pair} id="prev">
            &#8249;
          </button>
          <button onClick={onClickNext} className={styles.btn_pair} id="next">
            &#8250;
          </button>
        </div>
      </div>
    </div>
  );
};
