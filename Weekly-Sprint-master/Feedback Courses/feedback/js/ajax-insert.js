$(document).ready(function(e) {
    $('#submit').click(function(e) {
        e.preventDefault();
        var course_name = $('#course_name').val();
        var competency = $('#competency').val();
        var start_date = $('#start_date').val();
        var end_date = $('#end_date').val();
        var result = $('#result').val();
        var comment = $('#comment').val();
        var feedback_lecturer = $('#feedback_lecturer').val();
        var feedback_course = $('#feedback_course').val();
        var feedback_institute = $('#feedback_institute').val();
        var staff_name = $('#staff_name').val();
        var assigned_by = $('#assigned_by').val();
        var cost = $('#cost').val();
        var institute_name = $('#institute_name').val();
        var formdata = {
            course_name: course_name,
            competency: competency,
            start_date: start_date,
            end_date: end_date,
            result: result,
            comment: comment,
            feedback_lecturer: feedback_lecturer,
            feedback_course: feedback_course,
            feedback_institute: feedback_institute,
            staff_name: staff_name,
            assigned_by: assigned_by,
            cost: cost,
            institute_name: institute_name
        };
        console.log(formdata);
        $.ajax({
            type: 'POST',
            //contentType: "application/json; charset=utf-8", // this
            //dataType: "json", // and this
            data: formdata,
            url: '/feed/manage',
            //processData: false,
            //xhrFields: {
            //    withCredentials: false
            //},
            //headers: {},
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


    })
});


/*
        $.post("/feed/manage", formdata)
            .done(function(data) {
                console.log("*****************************");

                console.log(data);
            });
        */