import React from 'react';

const ConfirmationModal = ({ message, subMessage, actionText, onCancel, onAction }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm relative">
        <button
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700 absolute right-8 top-8"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex items-center justify-center mb-4">
          <div className="flex items-center justify-center w-12 h-10 bg-red-100 rounded-lg">
            <svg width="24px" height="24px" viewBox="0 0 35 32" fill="#000000">
              <g>
                <path fill="#F44336" d="M21.799,2.954C20.694,1.05,19.19,0,17.564,0c-1.626,0-3.131,1.05-4.236,2.954L1.059,24.087 c-1.12,1.947-1.24,3.969-0.33,5.546c0.866,1.5,2.565,2.363,4.664,2.367h24.341c0,0,0,0,0.001,0 c2.102-0.004,3.804-0.864,4.667-2.361c0.905-1.567,0.783-3.581-0.335-5.525L21.799,2.954z M33.537,29.139 c-0.681,1.18-2.067,1.858-3.804,1.861H5.394c-1.731-0.003-3.115-0.684-3.799-1.867c-0.727-1.26-0.606-2.917,0.33-4.546 L14.193,3.456C15.112,1.872,16.309,1,17.564,1c1.255,0,2.452,0.872,3.37,2.456l12.268,21.157 C34.137,26.239,34.259,27.889,33.537,29.139z"></path>
                <path fill="#F44336" d="M17.564,20c0.276,0,0.5-0.224,0.5-0.5v-10c0-0.276-0.224-0.5-0.5-0.5s-0.5,0.224-0.5,0.5v10 C17.064,19.776,17.288,20,17.564,20z"></path>
                <path fill="#F44336" d="M17.5,22.5c-1.103,0-2,0.897-2,2s0.897,2,2,2s2-0.897,2-2S18.603,22.5,17.5,22.5z M17.5,25.5 c-0.551,0-1-0.448-1-1s0.449-1,1-1s1,0.448,1,1S18.051,25.5,17.5,25.5z"></path>
              </g>
            </svg>
          </div>
        </div>

        <h2 className="text-lg font-bold text-center mb-2">{message}</h2>
        <p className="text-sm text-gray-500 text-center mb-6" dangerouslySetInnerHTML={{ __html: subMessage }}></p>

        <div className="flex flex-col gap-4">
          <button
            onClick={onAction}
            className="w-full bg-red-500 text-white font-semibold py-2 rounded-md hover:bg-red-600"
          >
            {actionText}
          </button>
          <button
            onClick={onCancel}
            className="w-full bg-gray-100 text-gray-700 font-semibold py-2 rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
