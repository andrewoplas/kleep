/**
 * This file contains the script used to manipulate HTML elements.
 * Initialization of libraries are also present in this file.
 */

// Usage: For redirecting to different pages
const page = {
	LOGIN: "login",
	SETTINGS: "settings",
	MAIN: "main"
};

// Usage: For dynamically inserting Folder contents in main.html
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

/**
 * For redirecting to a page. Uses `page` object
 * @param {string} page
 */
function redirect(page) {
	window.location.href = `${page}.html`;
}

/**
 * Initializes dropdown menu in main.html
 * Dropdown for bulk actions and folder contents' `more` (three dots) icon
 * @param {string} element
 */
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
	// Event Listener for Login Button in login.html
	$("#login").click(function() {
		// Get data
		const email = $("#email").val();
		const password = $("#password").val();
		const keepMeSignedIn = $("#keep-me-signed-in").is(":checked");

		// Log data
		console.log("login clicked");
		console.log("Email", email);
		console.log("Password", password);
		console.log("Keep Me Signed In", keepMeSignedIn);

		// Redirect to Settings pages
		redirect(page.SETTINGS);
	});
}

// Settings
function initializeSettings() {
	// Event Listener for Ready Button in settings.html
	$("#ready").click(function() {
		// Log information
		console.log("ready clicked");

		// Redirect to Main page
		redirect(page.MAIN);
	});
}

// Main
function initializeMain() {
	const container = $(".main-content .contents");

	// Folder click listener
	const activeImageSrc = "resources/assets/icons/folder-white.svg";
	const inactiveImageSrc = "resources/assets/icons/folder-gray.svg";
	$(".folders .list .item .title").click(function() {
		// Set all to inactive
		$(".folders .list .item")
			.removeClass("active")
			.find("img")
			.attr("src", inactiveImageSrc);

		// Set clicked to active
		$(this)
			.parents(".item")
			.addClass("active")
			.find("img")
			.attr("src", activeImageSrc);
	});

	// Add dynamic items in Folder Contents in main.html
	const generateData = function(query = "") {
		// Initial date number
		const startDate = 10;

		// Get cloneable row
		const item = $(".cloneable");

		// Remove items in Folder Contents list
		container.find(".list").empty();

		// If query is supplied, filter the list
		data.forEach(({ day, description }, index) => {
			// Filter: Include content if there is supplied query text
			// and supplied text is substring of content description
			if (query.length > 0 && !description.includes(query)) {
				return;
			}

			// Generate id for dropdown and checkbox
			const dropdownId = `more-actions-${day}-${index}`;
			const checkboxId = `checkbox-${day}-${index}`;

			// Clone the cloneable row
			const newItem = item.clone();

			// Remove cloneable class to so item will be shown
			newItem.removeClass("cloneable");

			// Update date data
			newItem.find(".date .day").text(day);
			newItem.find(".date .day-number").text(startDate + index);

			// Update name / description data
			newItem.find(".details .query-name").text(description);

			// Change dropdown id
			newItem.find(".dropdown-menu").attr("id", dropdownId);
			newItem.find(".CircularCheckbox input").attr("id", checkboxId);
			newItem.find(".CircularCheckbox label").attr("for", checkboxId);

			// Append / Add the item in list
			container.find(".list").append(newItem);

			// Initialize the dropdown menu (important)
			initializeMetisMenu(`#${dropdownId}`);
		});
	};

	// Initialize folder content on first load of page
	generateData();

	// Initialize dropdown menu for Bulk Actions
	initializeMetisMenu("#folder-bulk-actions");
	initializeMetisMenu("#content-bulk-actions");

	// Event listener for Copy button
	$(document).on("click", ".btn-copy", function() {
		// Log data
		console.log("copied");

		// Get snackbar element
		const snackbar = $("#snackbar");

		// Get snackbar element
		snackbar.text("Copied!");

		// Add show class
		snackbar.addClass("show");

		// Hide the snackbar element by removing the show class after 3000ms (3 seconds)
		setTimeout(function() {
			snackbar.removeClass("show");
		}, 3000);
	});

	// Event listener for Delete button
	$(document).on("click", ".btn-delete", function() {
		// Log data
		console.log("delete");
	});

	// Event Listener for Create Folder button
	$(".btn-create").click(function() {
		// Log data
		console.log("create folder");
	});

	// Event listener for Search Input
	$("#search").on("keyup", function() {
		// Get search input data
		const value = $(this)
			.val()
			.trim();

		// Display the folder contents
		generateData(value);
	});

	// Initialize datepicker
	const datepicker = $('[data-toggle="datepicker"]')
		.datepicker({ autoHide: true, trigger: "#datepicker-trigger" })
		.on("pick.datepicker", function(e) {
			// Get date
			const day = e.date.getDate();
			const month = $(this).datepicker("getMonthName", true);
			const year = e.date.getFullYear();

			// Set date
			$(this).text(`${month} ${day} ${year}`);
			e.preventDefault();
		});
	$('[data-toggle="datepicker"]').datepicker("pick");

	// Initialize listeners for Colors Selection Modal
	colorsSelectionModal();
}

function colorsSelectionModal() {
	const modal = $("#modal-color-selection");
	let selector = null;

	// Event listener for colors selection
	modal.find(".colors > div").click(function() {
		modal.find(".colors > div").removeClass("selected");
		$(this).addClass("selected");
		modal.find(".btn-apply").removeAttr("disabled");
	});

	// Event listener for modal selection before close
	modal.on($.modal.BEFORE_OPEN, function() {
		$(".colors > div").removeClass("selected");
		modal.removeAttr("type");
		modal.find(".btn-apply").attr("disabled", true);
		selector = null;
	});

	// Event listeners for color code
	$(document).on("click", '[href="#modal-color-selection"]', function() {
		modal.attr("type", $(this).attr("value"));
		selector = $(this);
	});

	// Event for apply
	modal.find(".btn-apply").click(function() {
		const selectedColor = modal.find(".selected").attr("value");

		if (selectedColor.length) {
			const type = modal.attr("type");
			let elements;

			if (type === "folder-content") {
				elements = selector.parents(".item");
			} else if (type === "folder-content-bulk") {
				elements = $(".contents .list > .item").has(
					'.CircularCheckbox [type="checkbox"]:checked'
				);
			} else if (type === "folder-bulk") {
				elements = $(".folders .list > .item").has(
					'.CircularCheckbox [type="checkbox"]:checked'
				);
			}

			elements.removeClass().addClass("item " + selectedColor);
			$.modal.close();
		}
	});
}

// Popup Settings
function initializePopupSettings() {}

// Popup User Info
function initializePopupUserInfo() {}
