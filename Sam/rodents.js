function drawSheetName() {
    var queryString = encodeURIComponent('SELECT A, H, O, Q, R, U LIMIT 5 OFFSET 8');

    var query = new google.visualization.Query(
        'https://docs.google.com/spreadsheets/d/10h2UftBDacQQXmTw6vEWxFGhInPhfTi1bqu5UPGnWIw/edit#gid=444832372' + queryString);
    query.send(handleSampleDataQueryResponse);
  }

  function handleSampleDataQueryResponse(response) {
    if (response.isError()) {
      alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
      return;
    }

    var data = response.getDataTable();
    var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
    chart.draw(data, { height: 400 });
  }