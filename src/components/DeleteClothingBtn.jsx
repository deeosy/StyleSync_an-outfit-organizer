import React, { useState } from 'react'
import useWardrobeStore, {} from '../store/wardrobeStore'
import useAuthenticationStore from '../store/userStore'
import { Modal, Tooltip } from '@mui/material'
import delBtn from '../icons/delete-btn-icon.svg'
import confirmBtn from '../icons/correct-icon.svg'

export default function DeleteClothingBtn({id}) {
    const {deleteClothingItem} = useWardrobeStore()  // get delete function 
    const {user} = useAuthenticationStore()  // get the current user, mainly its id 
    const [showConfirm, setShowConfirm] = useState(false)

    const handleDelete = () => {
      if(user?.uid){
        deleteClothingItem(id, user.uid)  // passing item id and user id to the delete button
        setShowConfirm(false)  // hide confirmation after deleting
      } else{
        console.error('User not authenticated, cannot delete item');        
      }
    }

  return (
    <div className="">
        { !showConfirm ? (
            <button  onClick={()=>{setShowConfirm(true)}} className='hover:cursor-pointer' >
              <Tooltip title="Delete" placement="left">
                <img src={delBtn} alt="Delete" className='h-4 w-4' />
              </Tooltip>
            </button>

        ) : (
          <Modal
            open={showConfirm} // Use showConfirm to change state
            onClose={() => setShowConfirm(false)} // Use showConfirm to close the confirmation
            aria-labelledby="delete-clothe-modal"
            aria-describedby="modal-to-delete-clothing-item"
          >
            <div className="bg-gray-200 rounded-md py-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-[400px] ">
              <div className="flex flex-col  justify-between items-center px-10 md:px-20">
                {/* Modal title */}
                <h2 id="confirm-deletion-modal" className="text-lg font-bold flex-1 mb-5">
                  Are you sure
                </h2>
                <div className="flex gap-4">
                    <button
                    onClick={() => setShowConfirm(false)} // Use toggleAddForm to close the form
                    className="bg-gray-300 text-sm font-medium px-4 py-2 rounded hover:cursor-pointer hover:bg-gray-400 transition-colors"
                    >
                      <img src={delBtn} alt="Cancel delete" className='h-4 w-4 ' />
                    </button>
                    <button
                    onClick={handleDelete} // Use toggleAddForm to close the form
                    className={`text-sm font-medium px-4 py-2 rounded hover:cursor-pointer ${user?.gender === 'male' ? 'bg-blue-300 hover:bg-blue-400' : 'bg-pink-400 hover:bg-pink-500'} transition-colors`}
                    >
                      <img src={confirmBtn} alt="Confirm delete" className='h-4 w-4 ' />
                    </button>

                </div>
              </div>
            </div>
          </Modal>
        )}  
    </div>
  )
}
