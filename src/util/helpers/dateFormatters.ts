export function getRandomTimeAgo(): string {
	const times = [
		"2 hours ago",
		"4 hours ago",
		"6 hours ago",
		"12 hours ago",
		"1 day ago",
		"2 days ago",
		"3 days ago",
	];
	return times[Math.floor(Math.random() * times.length)];
}
