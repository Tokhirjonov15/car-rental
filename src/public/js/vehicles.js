console.log("Products frontend javascript file");

$(function () {
    $("#process-btn").on("click", () => {
        $(".form-container").slideToggle(500);
        $("#process-btn").css("display", "none");
    });

    $("#cancel-btn").on("click", () => {
        $(".form-container").slideToggle(100);
        $("#process-btn").css("display", "flex");
    });

    $(".new-vehicle-status").on("change", async function (e) {
        const id = e.target.id;
        const vehicleStatus = $(`#${id}.new-vehicle-status`).val();
        console.log("id:", id);
        console.log('vehicleStatus:', vehicleStatus);

        try {
            const response = await axios.post(`/admin/vehicle/${id}`, {vehicleStatus: vehicleStatus});
            console.log("response:", response);
            const result = response.data;
            if (result.data) {
                console.log("Vehicle updated successfully!");
                $(".new-vehicle-status").blur();
            } else alert("Vehicle update failed!");
        } catch (err) {
            console.log(err);
            alert("Vehicle update failed");
        }
    })
});

function validateForm () {
    const vehicleName = $(".vehicle-name").val();
    const vehiclePrice = $(".vehicle-price").val();
    const vehicleDoor = $(".vehicle-door").val();
    const vehicleSeat = $(".vehicle-seat").val();
    const vehicleMile = $(".vehicle-mile").val();
    const vehicleStatus = $(".vehicle-status").val();

     if (
        vehicleName === "" ||
        vehiclePrice === "" ||
        vehicleDoor === "" ||
        vehicleSeat === "" ||
        vehicleMile === "" ||
        vehicleStatus === ""
     ) {
        alert("Please, insert all details");
        return false;
     } else return true;
}

function previewFileHandler(input, order) {
    const imgClassName = input.className;
    console.log("input:", input);

    const file = $(`.${imgClassName}`).get(0).files[0];
    const fileType = file["type"];
    const validImageType = ["image/jpg", "image/jpeg", "image/png"];

     if(!validImageType.includes(fileType)) {
         alert("Please, insert only jpg, jpeg and png!");
     } else {
        if (file) {
            const reader = new FileReader();
            reader.onload = function () {
                $(`#image-section-${order}`).attr("src", reader.result);
            };
            reader.readAsDataURL(file);
        }
     }
} 

