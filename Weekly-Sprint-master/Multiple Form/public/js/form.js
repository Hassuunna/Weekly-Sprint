var cnt = 1;

function appendy() {

    var form_rows = `<div class="rows" id="template${cnt}">
											<div class="form-row">
												<div class="col-md-12">
													<input type="text" class=" first form-control" id="first_name${cnt}" placeholder="First name" value="" required>
													<div class="valid-feedback">Nice one Buddy!</div>
													<div class="invalid-feedback">What's your name? :D</div>
												</div>
												<div class="col-md-12">
													<input type="text" class="form-control" id="last_name${cnt}" placeholder="Last name" value="" required>
													<div class="valid-feedback">Your parent must be proud of that name!</div>
													<div class="invalid-feedback">How's your family!</div>
												</div>
											</div>
											<div class="form-row">
												<div class="col-md-12">
													<input class="form-control" id="phone_number${cnt}" maxlength="11" pattern="\d*" type="number" placeholder="Phone Number" value="" required>
													<div class="valid-feedback">Dont worry its secure with us :D</div>
													<div class="invalid-feedback">I'm not calling late ;)</div>
												</div>
												<div class="col-md-12">
													<div class="custom-file">
														<label class="custom-file-label" for="profile_pic${cnt}">Choose file...</label>
														<input type="file" name="myImage" accept="image/*" class=" pic form-control-file" id="profile_pic${cnt}" required>
														<div class="invalid-feedback">Example invalid custom file feedback</div>
													</div>
												</div>
											</div>
										</div>`;
    //$("#container").append(form_rows);
    //console.log('inside appendy');
    var prevcnt = cnt - 1;
    var previous = "#template" + prevcnt;
    $(previous).css('border-radius', '0');
    $(form_rows).insertBefore($("#submit"));
    if (cnt == 1) color = '#BDBDBD';
    if (cnt == 2) color = '#9E9E9E';
    if (cnt == 3) color = '#757575';
    if (cnt == 4) color = '#616161';
    if (cnt == 5) color = '#212121';
    var temp = "#template" + cnt;
    $(temp).css('border-radius', '0 0 15px 15px');
    $(temp).css('background-color', color);
    cnt++;
}
$(document).ready(function() {
    appendy();
    $("#plus").click(function() {
        console.log('add clicked');
        if (cnt <= 5) {
            appendy();
        } else {
            console.log('you cant add more')
        }
    });
});