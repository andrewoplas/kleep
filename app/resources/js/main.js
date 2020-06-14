// Common
const page = {
	LOGIN: "login",
	SETTINGS: "settings",
	MAIN: "main"
};

const data = [
	{
		day: "Mon",
		description: "Lorem ipsum 1"
	},
	{
		day: "Tue",
		description: "Lorem ipsum 2"
	},
	{
		day: "Wed",
		description: "Lorem ipsum 3"
	},
	{
		day: "Thu",
		description: "Lorem ipsum 4"
	},
	{
		day: "Fri",
		description: "Lorem ipsum 5"
	}
];

function redirect(page) {
	window.location.href = `${page}.html`;
}

function initializeMetisMenu(element) {
	const mm = new MetisMenu(element).on("shown.metisMenu", function(event) {
		window.addEventListener("click", function mmClick(e) {
			if (!event.target.contains(e.target)) {
				mm.hide(event.detail.shownElement);
				window.removeEventListener("click", mmClick);
			}
		});
	});
}

// Login
function initializeLogin() {
	$("#login").click(function() {
		const email = $("#email").val();
		const password = $("#password").val();
		const keepMeSignedIn = $("#keep-me-signed-in").is(":checked");

		console.log("login clicked");
		console.log("Email", email);
		console.log("Password", password);
		console.log("Keep Me Signed In", keepMeSignedIn);

		redirect(page.SETTINGS);
	});
}

// Settings
function initializeSettings() {
	$("#ready").click(function() {
		console.log("ready clicked");

		redirect(page.MAIN);
	});
}

// Main
function initializeMain() {
	const container = $(".main-content .contents");

	// Add dynamic items
	const generateData = function(query = "") {
		const startDate = 10;
		const item = $(".cloneable");
		container.find(".list").empty();
		data.forEach(({ day, description }, index) => {
			// Filter
			if (query.length > 0 && !description.includes(query)) {
				return;
			}

			const dropdownId = `more-actions-${day}-${index}`;
			const checkboxId = `checkbox-${day}-${index}`;
			const newItem = item.clone();

			// Remove cloneable class to so item will be shown
			newItem.removeClass("cloneable");

			// Update date
			newItem.find(".date .day").text(day);
			newItem.find(".date .day-number").text(startDate + index);

			// Update name / description
			newItem.find(".details .query-name").text(description);

			// Change dropdown id
			newItem.find(".dropdown-menu").attr("id", dropdownId);
			newItem.find(".CircularCheckbox input").attr("id", checkboxId);
			newItem.find(".CircularCheckbox label").attr("for", checkboxId);

			// Append
			container.find(".list").append(newItem);

			initializeMetisMenu(`#${dropdownId}`);
		});
	};
	generateData();

	// Bulk actions
	initializeMetisMenu("#folder-bulk-actions");
	initializeMetisMenu("#content-bulk-actions");

	// Copy
	$(document).on("click", ".btn-copy", function() {
		console.log("copied");
		const snackbar = $("#snackbar-copy");
		snackbar.addClass("show");

		setTimeout(function() {
			snackbar.removeClass("show");
		}, 3000);
	});

	// Remove confirmation
	$(document).on("click", ".btn-delete", function() {
		console.log("delete");
	});

	// Create Folder
	$(".btn-create").click(function() {
		console.log("create folder");
	});

	// Search
	$("#search").on("keyup", function() {
		const items = container.find(".list .item");
		const value = $(this)
			.val()
			.trim();
		generateData(value);
	});
}

// Popup Settings
function initializePopupSettings() {
	$("#ready").click(function() {
		console.log("ready clicked");

		redirect(page.MAIN);
	});
}
