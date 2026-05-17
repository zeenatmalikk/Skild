import { Link } from "@tanstack/react-router";
import {
	ArrowBigUp,
	ArrowUpRight,
	Bookmark,
	Check,
	Copy,
	MessageSquare,
} from "lucide-react";
import React from "react";

const SkillCard = ({
	authorEmail,
	category,
	createdAt,
	description,
	installCommand,
	tags,
	title,
}: SkillRecord) => {
	const [copied, setCopied] = React.useState(false);
	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(installCommand);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (error) {
			setCopied(false);
			console.error("Failed to copy", error);
		}
	};
	return (
		<article className="skill-card">
			<Link
				to={`/skills/${title}`}
				tabIndex={-1}
				aria-label={`Open skill ${title}`}
				className="overlay"
			/>
			<div className="chrome">
				<div className="chrom-bar">
					<div className="lights">
						<div className="light red" />
						<div className="light amber" />
						<div className="light green" />
					</div>
					<div className="host">registry.sh</div>
				</div>
			</div>
			<div className="body">
				<div className="meta">
					<div className="author">
						<img
							src="/logo512.png"
							alt={`${authorEmail}'s avatar`}
							className="avatar"
						/>
						<div className="author-copy">
							<p>Zeenat</p>
							<p>
								{createdAt
									? new Date(createdAt).toLocaleDateString()
									: "Unknown date"}
							</p>
						</div>
					</div>
					<p className="category">{category}</p>
				</div>
				<div className="summary">
					<Link to={`/skills/${title}`} className="title-link">
						<h3>{title}</h3>
					</Link>
					<p>{description}</p>
				</div>
				<div className="command">
					<div className="command-copy">
						<span>{">_"}</span>
						<p>{installCommand}</p>
					</div>
					<button
						type="button"
						aria-label="Copy install command to clipboard"
						className="copy"
						onClick={handleCopy}
					>
						{copied ? <Check size={16} /> : <Copy size={16} />}
					</button>
				</div>
				<div className="footer">
					<div className="stats">
						<button type="button" className="upvote" disabled>
							<ArrowBigUp size={16} fill={"currentColor"} />
							<span>{tags.length}</span>
						</button>
						<div className="comments">
							<MessageSquare size={14} />
							<span>{authorEmail ? 1 : 0}</span>
						</div>
					</div>
					<div className="actions">
						<Link
							to={`/skills/${title}`}
							className="open"
							title={`Open skill ${title}`}
						>
							<span>Open</span>
							<ArrowUpRight size={14} />
						</Link>
						<button
							type="button"
							className="save"
							aria-label="Saved state"
							disabled
						>
							<Bookmark size={16} />
						</button>
					</div>
				</div>
			</div>
		</article>
	);
};

export default SkillCard;
