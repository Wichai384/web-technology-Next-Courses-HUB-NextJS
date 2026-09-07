
import Image from "next/image";
import type { Band } from "../types/Band";

type BandCardProps = {
  band: Band;
  isFollowing?: boolean;
  onToggleFollowing?: (id: number) => void;
  isLiked?: boolean;
  likeCount?: number;
  onToggleLike?: (id: number) => void;
};

export default function BandCard({
  band,
  isFollowing = false,
  onToggleFollowing,
  isLiked = false,
  likeCount = 0,
  onToggleLike,
}: BandCardProps) {
  return (
    <article className="band-card">
      <div className="band-card__image">
        <Image
          src={band.imageUrl}
          alt={`ภาพวง ${band.name}`}
          width={400}
          height={300}
          sizes="(max-width: 768px) 100vw, 400px"
        />
      </div>

      <h2>{band.name}</h2>
      <p className="band-card__meta">
        แนวเพลง: {band.genre}
      </p>
      <p className="band-card__meta">
        ก่อตั้งปี พ.ศ. {band.formedYear}
      </p>
      <p>{band.description}</p>

      <div className="band-card__actions">
      {onToggleFollowing && (
        <button
          type="button"
          className="bandFollowButton"
          onClick={() => onToggleFollowing(band.id)}
          aria-pressed={isFollowing}
          aria-label={
            isFollowing ? "เลิกติดตามวงดนตรี" : "ติดตามวงดนตรี"
          }
          title={isFollowing ? "เลิกติดตาม" : "ติดตาม"}
        >
          {isFollowing ? "เลิกติดตาม" : "ติดตาม"}
        </button>
      )}
      {onToggleLike && (
        <button
          type="button"
          className="bandLikeButton"
          onClick={() => onToggleLike(band.id)}
          aria-pressed={isLiked}
          aria-label="กดถูกใจวงดนตรี"
        >
          {isLiked ? "♥" : "♡"} <span>{likeCount}</span>
        </button>
      )}
      </div>

      <h3>สมาชิกในวง</h3>
      <ul className="band-card__members">
        {band.members.map((member) => {
          const memberImage = member.imageUrl ?? band.imageUrl;

          return (
            <li key={member.id}>
              {memberImage && (
                <Image
                  src={memberImage}
                  alt={member.name}
                  width={100}
                  height={100}
                  className="band-card__member-image"
                />
              )}
              <span className="band-card__member-name">{member.name}</span>
              <span className="band-card__member-role">{member.role}</span>
            </li>
          );
        })}
      </ul>
    </article>
  );
}
