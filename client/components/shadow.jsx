import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SHOW_SHADOW } from '../common/constants/action-types';

const Shadow = () => {
  const shadowTime = useSelector(state => state.shadow.shadow);
  const [showShadow, setShowShadow] = React.useState('noShadow');
  const dispatch = useDispatch();

  React.useEffect(
    () => {
      if (shadowTime) setShowShadow('shadow');
      else setShowShadow('noShadow');
    }, [shadowTime]
  );

  return (
    <div className={showShadow} onClick={
      () => dispatch({ type: SHOW_SHADOW, payload: !shadowTime })
    }></div>
  );
};

export default Shadow;
