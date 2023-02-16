import './App.scss';
import React from 'react';
import { useSelector } from 'react-redux';
import { CircleBlock } from './components/circle/CircleBlock';
import { SwiperBlock } from './components/swiper/SwiperBlock';
import { HeaderBlock } from './components/header/HeaderBlock';
import { setActiveCategory, fetchData } from './redux/slices/dataSlice';
import { useAppDispatch } from './redux/store';
import { RootState } from './redux/store';

function App() {
  const dispatch = useAppDispatch();
  const { items, activeCategory, currentDatesArr } = useSelector((state: RootState) => state.data);

  React.useEffect(() => {
    dispatch(fetchData());
  }, []);

  const setActiveItem = (item: number) => {
    dispatch(setActiveCategory(item));
  };

  return items.length > 0 ? (
    <div className="main">
      <HeaderBlock />
      <CircleBlock itemsArr={items} activeItem={activeCategory} onClick={setActiveItem} />
      <SwiperBlock dates={currentDatesArr} />
    </div>
  ) : (
    <></>
  );
}

export default App;
