import React from 'react';

export const DeleteCard = ({ productId, handleDelete, closeDeleteModal }) => {
    const handleConfirmDelete = () => {
        handleDelete(productId);
        closeDeleteModal();
    };

    return (
        <div className="modal show " tabindex="-1" style={{ display: 'block' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Confirm Delete</h5>
                        <button type="button" className="btn-close" aria-label="Close" onClick={closeDeleteModal}></button>
                    </div>
                    <div className="modal-body">
                        <p>Are you sure you want to delete this product?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={closeDeleteModal}>Close</button>
                        <button type="button" className="btn btn-danger" onClick={handleConfirmDelete}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
