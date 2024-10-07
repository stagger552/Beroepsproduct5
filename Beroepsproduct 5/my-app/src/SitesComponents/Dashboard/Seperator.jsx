
import React from 'react';
import { ReactComponent as Boei } from '../../img/boei.svg';

function Seperator() {
  const test = "Baan"

  return (
    <div className="container-fluid  bg-lightblue h-80 my-6">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 flex justify-center items-center">
            <Boei className='max-h-56' />
          </div>
          <div className="col-lg-9 flex justify-center items-center">
            <h1 className="text-8xl max-sm:text-5xl font-alatsi text-white">
              Arduino Data
            </h1>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Seperator;