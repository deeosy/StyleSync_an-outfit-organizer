import React, { useState } from 'react'
import useWardrobeStore from '../store/wardrobeStore'
import useAuthenticationStore from '../store/userStore'
import useThemeStore from '../store/themeStore'
import { Modal, Tooltip } from '@mui/material'
import { Trash2, X, Check } from 'lucide-react'

export default function DeleteClothingBtn({id}) {
    const {deleteClothingItem} = useWardrobeStore()  // get delete function 
    const {user} = useAuthenticationStore()  // get the current user, mainly its id 
    const { getTheme } = useThemeStore()
    const theme = getTheme()
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
            <button  
              onClick={()=>{setShowConfirm(true)}} 
              className={`p-2 rounded-lg ${theme.backgroundSecondary || theme.light} hover:bg-red-100 ${theme.isDark ? 'hover:bg-red-900/20' : ''} transition-all duration-200 transform hover:scale-110 active:scale-95 border ${theme.border}`}
            >
              <Tooltip title="Delete Item" placement="left">
                <Trash2 className='h-4 w-4 text-red-500 hover:text-red-600' />
              </Tooltip>
            </button>

        ) : (
          <Modal
            open={showConfirm} // Use showConfirm to change state
            onClose={() => setShowConfirm(false)} // Use showConfirm to close the confirmation
            aria-labelledby="delete-clothe-modal"
            aria-describedby="modal-to-delete-clothing-item"
          >
            <div className={`${theme.surface} rounded-lg shadow-xl py-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-[400px] border ${theme.border} transition-colors duration-200`}>
              <div className="flex flex-col justify-between items-center px-10 md:px-20">
                {/* Modal title */}
                <div className="text-center mb-6">
                  <div className="mx-auto mb-4 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <Trash2 className="h-6 w-6 text-red-600" />
                  </div>
                  <h2 id="confirm-deletion-modal" className={`text-xl font-bold ${theme.textPrimary} mb-2`}>
                    Delete Item?
                  </h2>
                  <p className={`text-sm ${theme.textSecondary}`}>
                    This action cannot be undone. The item will be permanently removed from your wardrobe.
                  </p>
                </div>
                
                <div className="flex gap-3 w-full">
                    <button
                      onClick={() => setShowConfirm(false)}
                      className={`flex-1 flex items-center justify-center gap-2 ${theme.backgroundSecondary || theme.light} ${theme.textSecondary} text-sm font-medium px-4 py-3 rounded-lg hover:bg-gray-300 ${theme.isDark ? 'hover:bg-gray-600' : ''} transition-all duration-200 transform hover:scale-105 active:scale-95 border ${theme.border}`}
                    >
                      <X className="h-4 w-4" />
                      Cancel
                    </button>
                    <button
                      onClick={handleDelete}
                      className={`flex-1 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md`}
                    >
                      <Check className="h-4 w-4" />
                      Delete
                    </button>
                </div>
              </div>
            </div>
          </Modal>
        )}  
    </div>
  )
}