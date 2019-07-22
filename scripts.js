var table_html;
var nodes_html = '';
var nodes_online = 0;
var clients_online = 0;

function nodedata2html(item, index, arr) {
    //console.log(item)
    if (item === "undefinded") {
        return null;
    }
    nodes_html += '<tr>';
    node_hostname = '';
    if (item.hostname !== "undefined") {
        node_hostname = item.hostname;
    }
    nodes_html += '<td><a href="https://mate.ffbsee.net/meshviewer/#!/de/map/' + item.node_id + '" target="_blank">' + node_hostname + '</a></td>';
    if (item.is_online == true) {
        nodes_html += '<td>online</td>';
        nodes_online++;
    } else {
        nodes_html += '<td>offline</td>';
    }

    node_uptime = '';
    if (item.uptime !== "undefined") {
        node_uptime = item.uptime;
    }

    nodes_html += '<td class="maxi">' + node_uptime + '</td>';

    node_clients = 0;
    if (item.uptime !== "undefined" && !isNaN(item.clients)) {
        node_clients = item.clients;
        clients_online += node_clients;
    }
    nodes_html += '<td class="amount">' + node_clients + '</td>';


    node_geo = 'nein';
    if (item.location !== "undefined" && item.location.longitude !== "undefined" && item.location.latitude !== "undefined" && !isNaN(item.location.longitude) && !isNaN(item.location.latitude)) {
        node_geo = '<a href="http://www.openstreetmap.org/?mlat=' + item.location.latitude + '&mlon=' + item.location.longitude + '&zoom=12">ja</a>';
    }

    nodes_html += '<td class="maxi">' + node_geo + '</td>';

    node_firmware = '&nbsp;';
    if (item.firmware !== "undefined" && item.firmware.base !== "undefined" && item.firmware.release !== "undefined") {
        node_firmware = item.firmware.base + '-' + item.firmware.release;
    }

    nodes_html += '<td>' + node_firmware + '</td>';
    nodes_html += '<td class="maxi">' + item.model + '</td>';
    nodes_html += '<td class="maxi">' + item.site_code + '</td>';
    nodes_html += '</tr>';
}

$.ajax({
    type: 'GET',
    crossDomain: true,
    url: 'meshviewer.json',
    success: function(data) {
        //console.log(data);

        table_html = '<table class="sortable-theme-dark" data-sortable>';

        table_html += '<thead>';
        table_html += '<tr>';
        table_html += '<th data-sortable-type="alpha">Name</th>';
        table_html += '<th>Status</th>';
        table_html += '<th class="maxi">Uptime</th>';
        table_html += '<th style="width: 5em">Clients</th>';
        table_html += '<th class="maxi">Geo</th>';
        table_html += '<th>Firmware</th>';
        table_html += '<th class="maxi">Hardware</th>';
        table_html += '<th class="maxi">Community</th>';
        table_html += '</tr>';
        table_html += '</thead>';

        data.nodes.forEach(nodedata2html);
        table_html += nodes_html;

        table_html += '<tfoot><tr>';
        table_html += '<td>Nodes: ' + data.nodes.length + '</td>';
        table_html += '<td>Online: ' + nodes_online + '</td>';
        table_html += '<td class="maxi">&nbsp;</td>';
        table_html += '<td>Clients: ' + clients_online + '</td>';
        table_html += '<td>&nbsp;</td>';
        table_html += '<td class="maxi" colspan="3">&nbsp;</td>';
        table_html += '</tr></tfoot>';
        table_html += '</table>';

        $('#table_container').append(table_html);
        sortTable = document.querySelector('#table_container > table');
        Sortable.initTable(sortTable);


    }
})

$('a[href="#toggle_maxi"]').click(function() {
    $('.maxi').toggle();
});
