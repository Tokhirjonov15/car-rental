console.log("Users frontend javascript file");

$(function () {
    $(".member-status").each(function() {
        $(this).data('original-value', $(this).val());
    });

    $(".member-status").on("change", function(e) {
        const selectElement = $(this);
        const id = e.target.id;
        const userStatus = selectElement.val();
        const oldStatus = selectElement.data('original-value');
        
        console.log("Updating:", { id, oldStatus, newStatus: userStatus });

        if (!confirm(`Change status to ${userStatus}?`)) {
            selectElement.val(oldStatus);
            return;
        }

        selectElement.prop('disabled', true);

        axios.post("/admin/user/edit", {
            _id: id,
            userStatus: userStatus,  
        })
        .then((response) => {
            console.log("Response:", response.data);
            
            const result = response.data;
            
            if (result.data) {
                console.log("User updated successfully!");
                
                selectElement.data('original-value', userStatus);
                selectElement.prop('disabled', false);
                
                alert("Status updated successfully!");
                
            } else {
                console.error("No data in response");
                selectElement.val(oldStatus);
                selectElement.prop('disabled', false);
                alert("User update failed!");
            }
        })
        .catch((err) => {
            console.error("Error:", err);
            console.error("Response:", err.response);
            
            selectElement.val(oldStatus);
            selectElement.prop('disabled', false);
            
            const errorMsg = err.response?.data?.message || err.message;
            alert("User update failed: " + errorMsg);
        });
    });
});