import { revalidatePath } from "next/cache";
import { pendingReviews, moderateReview } from "@/lib/admin/queries";
import { Button } from "@/components/ui/Button";

export const dynamic = "force-dynamic";

/**
 * Review moderation queue. Verified-purchase is structural (order FK),
 * so it isn't even a toggle here. Rejections require a logged reason.
 * TODO(auth): moderatorId must come from the admin session once
 * Payload auth middleware is wired; the server action refuses to run
 * without it rather than defaulting to a fake user.
 */
export default async function ReviewsQueue() {
  const reviews = await pendingReviews();

  async function decide(formData: FormData) {
    "use server";
    const moderatorId = formData.get("moderatorId") as string | null;
    if (!moderatorId) throw new Error("No moderator session; sign in via the CMS first.");
    await moderateReview(
      formData.get("id") as string,
      formData.get("decision") === "approve",
      moderatorId,
      (formData.get("reason") as string) || undefined,
    );
    revalidatePath("/admin/reviews");
  }

  return (
    <>
      <h1 className="type-display text-3xl text-bone">Review moderation</h1>
      <p className="mt-3 max-w-xl text-[14px] text-bone-dim">
        Every entry is a verified purchase by construction. Approve as written, or reject with a
        reason — reasons are permanently logged. Edits beyond typo level are not available anywhere.
      </p>
      {reviews.length === 0 ? (
        <p className="mt-12 text-[14px] text-bone-dim">The queue is empty. Nothing is waiting on you.</p>
      ) : (
        <ul className="mt-10 space-y-6">
          {reviews.map((r) => (
            <li key={r.id} className="hairline p-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="type-label text-oil-bright">Verified purchase</span>
                {r.incentivised && <span className="type-label">Incentivised — disclosure badge will show</span>}
                <span className="type-label">{r.product}</span>
                <span className="type-label">{r.rating}/5</span>
                <span className="type-label">{r.email}</span>
              </div>
              <p className="mt-4 text-[14px] leading-relaxed text-bone">{r.body}</p>
              <form action={decide} className="mt-5 flex flex-wrap items-center gap-3">
                <input type="hidden" name="id" value={r.id} />
                <input type="hidden" name="moderatorId" value="" />
                <Button type="submit" name="decision" value="approve" className="px-5 py-2">Approve</Button>
                <input
                  name="reason" placeholder="Rejection reason (required to reject)"
                  className="hairline min-w-64 bg-transparent px-4 py-2 text-[13px] text-bone placeholder:text-bone-dim/60"
                />
                <Button type="submit" name="decision" value="reject" variant="outline" className="px-5 py-2">Reject</Button>
              </form>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
