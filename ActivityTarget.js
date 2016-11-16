
document.title = "Bidding";

function showPageSlide(pageWidth, href) {
	href += href.indexOf('?') != -1 ? '&' : '?';
	href += 'pageslide=true&random=' + (new Date).getTime();

	$.pageslide({
		href: href,
		pageWidth: pageWidth
	});
}

setTimeout(function () {
		showPageSlide(580, '/ActivityTarget/Auction/706373' + location.search);
	}, 0);

function h(n) {
	return n
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
			// var e = f.PagerData;
			// var h = f.DataList;
			// t.pageIndex = e.PageIndex;
			// n.fn.PagerTable.defaults.pageIndex = t.pageIndex;
			// n.fn.PagerTable.defaults.ajaxParameters = t.ajaxParameters;
			// e.TotalCount > 0 ? n('#targetcountdown').show()  : n('#targetcountdown').hide();
			// t.sortField = e.SortField;
			// n.fn.PagerTable.defaults.sortField = e.SortField;
			// n.fn.PagerTable.defaults.selector = n(i).attr('id');
			// t.sortDirection = e.SortDirection;
			// n.fn.PagerTable.defaults.sortDirection = e.SortDirection;
			// u[r] = t;
			// c = t.primaryKeyName;
			// o = function () {
			// 	typeof t.execFunction != 'undefined' && t.execFunction()
			// };
			// setTimeout(function () {
			// 	s(h, t.pageIndex, e.PageCount, t.pagerNumber, o, e)
			// }, 500)
		},
		error: function () {
		}
	})

}

request($('#searchfrm').serializeObject(), 5, function (response) {
	var pagerData = response.PagerData;
	request($('#searchfrm').serializeObject(), pagerData.TotalCount, function (response) {
		var pagerData = response.PagerData;
		var dataList = response.DataList;
		alert(pagerData.TotalCount);
		alert(pagerData.PageCount);
	});
});
