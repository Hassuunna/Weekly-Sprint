$(document).ready(function(e) {
    $('#submit').click(function(e) {
        e.preventDefault();
        //console.log('counter inside ajax = ', cnt);
        var prev = cnt - 1;
        var sel_fir_nm, sel_lst_nm, sel_phn_nmb, sel_prf_pic,
            first_name, last_name, phone_number, profile_pic,
            formdata;
        for (var i = 1; i <= prev; i++) {
            sel_fir_nm = "#first_name" + i;
            sel_lst_nm = "#last_name" + i;
            sel_phn_nmb = "#phone_number" + i;
            //sel_prf_pic = "#profile_pic" + i;
            first_name = $(sel_fir_nm).val();
            last_name = $(sel_lst_nm).val();
            phone_number = $(sel_phn_nmb).val();
            //profile_pic = $(sel_prf_pic)
            formdata = {
                first_name: first_name,
                last_name: last_name,
                phone_number: phone_number,
                //profile_pic: profile_pic
            };
            //console.log('form data is\n', formdata, '\n\n');
            $.ajax({
                type: 'POST',
                //dataType: "json", // and this
                data: formdata,
                url: '/form',
                success: function(result) {
                    alert("Got the result: " + result);
                },
                error: function(xhr, status, error) {
                    alert("Status: " + status);
                    alert("Error: " + error);
                    alert("xhr: " + xhr.readyState);
                    return false;
                },
                statusCode: {
                    404: function() {
                        alert("page not found");
                    }
                }
            });
        }
    })
});