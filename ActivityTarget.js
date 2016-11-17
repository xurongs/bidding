
document.title = "Bidding";

function showPageSlide(pageWidth, href) {
	href += href.indexOf('?') != -1 ? '&' : '?';
	href += 'pageslide=true&random=' + (new Date).getTime();

	$.pageslide({
		href: href,
		pageWidth: pageWidth
	});
}

function show(id) {
	showPageSlide(580, '/ActivityTarget/Auction/' + id + location.search);
}


function format(n) {
	var t = '';
	for (var i in n) t += i + '=' + encodeURIComponent(n[i]) + '&';
		return t
}

$.fn.serializeObject = function () {
	var t = {};
	return $.each(this.serializeArray(), function (i, r) {
		var u = r.name, f = r.value;
		t[u] = t[u] === undefined ? f : $.isArray(t[u]) ? t[u].concat(f)  : [
		t[u],
		f
		]
	}),
	t
}

function request(parameters, size, success) {
	$.ajax({
		type: 'GET',
		cache: !1,
		contentType: 'text/json',
		url: '/ActivityTarget/GetTarget',
		data: format(parameters) + 'pageIndex=' + 1 + '&pageSize=' + size + '&sortField=' + 't.Sort' + '&sortDirection=' + 0,
		beforeSend: function () {
		},
		success: function (response) {
			success(response);
		},
		error: function () {
		}
	})

}

var options = [];

function load_config() {

	function onError(error) {
		console.log(`Error: ${error}`);
	}

	function onGot(result) {
		if (result[0].location) {
			options = result[0].location.split(' ')
				.filter(function (loc) {
					return loc.length > 0;
				});
			console.log('options: ' + options);
		}
	}

	var getting = browser.storage.local.get(["location"]);
	getting.then(onGot, onError);
}

function reload_config(changes, area) {
	load_config();
}

browser.storage.onChanged.addListener(reload_config);
load_config();

function pickup_expected(records, expected) {
	return records.find(function (record) {
		return record.Num === expected;
	});
}

function pickup(records) {
	var mz = options.map(function (option) {
		return pickup_expected(records, option);
	})
	.filter(function (option) {
		return option !== undefined
			/* 2: jijiangkaishi 3:canyuxuanfang 5:yichengjiao */
			&& (option.Status === 2
			|| option.Status === 3);
	});
	return mz[0];
}

var last = undefined;
function show_last(id) {
	if ($('#pageslide').is(':hidden') || last != id) {
		show(id);
		last = id;
	}
}

var points = ''
function setTitle() {
	if (points.length < 4) {
		points += '.';
	} else {
		points = '';
	}
	document.title = ('Bidding' + points);
}

var pause = false;

function retry() {
	if (!pause) {
		setTitle();
		request($('#searchfrm').serializeObject(), 5, function (response) {
			var pagerData = response.PagerData;
			request($('#searchfrm').serializeObject(), pagerData.TotalCount, function (response) {
				var pagerData = response.PagerData;
				var dataList = response.DataList;
				var target = pickup(dataList);
				if (target !== undefined) {
					var id = pickup(dataList).ID;
					show_last(id);
				}
			});
		});		
	} else {
		document.title = options;
	}
}

setInterval(retry, 1000);

function setPause() {
    pause = !pause;
}

document.addEventListener("dblclick", setPause, true);

