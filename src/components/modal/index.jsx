import PropTypes from 'prop-types';

export default function Modal({isOpen, callbackClose, title, subtitle, children}) {
  return (
    <div>
      {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <button className='fixed top-2 right-2 bg-gray-200 px-2 rounded-full' onClick={callbackClose}>&times;</button>
              <div className='px-5 py-5'>
                <h1 className='text-lg text-gray-500'>{title}</h1>
                <h1 className='text-lg font-bold'>{subtitle}</h1>
                {children}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

Modal.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  callbackClose: PropTypes.func,
  children: PropTypes.node
};
