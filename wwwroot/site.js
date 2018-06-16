const uri = 'api/car';
let cars = null;
function getCount(data) {
    const el = $('#counter');
    let name = 'to-do';
    if (data) {
        if (data > 1) {
            name = 'to-dos';
        }
        el.text(data + ' ' + name);
    } else {
        el.html('No ' + name);
    }
}

$(document).ready(function () {
    getData();
});

function getData() {
    $.ajax({
        type: 'GET',
        url: uri,
        success: function (data) {
            $('#cars').empty();
            getCount(data.length);
            $.each(data, function (key, car) {
                // const checked = item.isComplete ? 'checked' : '';

                $('<tr>' +
                    '<td>' + car.manufacturer + '</td>' +
                    '<td>' + car.make + '</td>' +
                    '<td>' + car.model + '</td>' +
                    '<td>' + car.year + '</td>' +
                    '<td><button onclick="editItem(' + car.id + ')">Edit</button></td>' +
                    '<td><button onclick="deleteItem(' + car.id + ')">Delete</button></td>' +
                    '</tr>').appendTo($('#cars'));
            });

            cars = data;
        }
    });
}

function addItem() {
    const car = {
        'manufacturer': $('#add-manufacturer').val(),
        'make': $('#add-make').val(),
        'model': $('#add-model').val(),
        'year': $('#add-year').val(),
    };

    $.ajax({
        type: 'POST',
        accepts: 'application/json',
        url: uri,
        contentType: 'application/json',
        data: JSON.stringify(car),
        error: function (jqXHR, textStatus, errorThrown) {
            alert('here');
        },
        success: function (result) {
            getData();
            $('#add-manufacturer').val('');
        }
    });
}

function deleteItem(id) {
    $.ajax({
        url: uri + '/' + id,
        type: 'DELETE',
        success: function (result) {
            getData();
        }
    });
}

function editItem(id) {
    $.each(cars, function (key, car) {
        if (car.id === id) {
            $('#edit-manufacturer').val(car.manufacturer);
            $('#edit-make').val(car.make);
            $('#edit-model').val(car.model);
            $('#edit-year').val(car.year);
            $('#edit-id').val(car.id);
        }
    });
    $('#spoiler').css({ 'display': 'block' });
}

$('.my-form').on('submit', function () {
    const car = {
        'manufacturer': $('#edit-manufacturer').val(),
        'make': $('#edit-make').val(),
        'model': $('#edit-model').val(),
        'year': $('#edit-year').val(),
        'id': $('#edit-id').val()
    };

    $.ajax({
        url: uri + '/' + $('#edit-id').val(),
        type: 'PUT',
        accepts: 'application/json',
        contentType: 'application/json',
        data: JSON.stringify(car),
        success: function (result) {
            getData();
        }
    });

    closeInput();
    return false;
});

function closeInput() {
    $('#spoiler').css({ 'display': 'none' });
}