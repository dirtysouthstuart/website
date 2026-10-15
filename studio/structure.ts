import type { StructureResolver } from "sanity/structure";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import { BookIcon } from "@sanity/icons/Book";
import { CalendarIcon } from "@sanity/icons/Calendar";
import { CogIcon } from "@sanity/icons/Cog";
import { DropIcon } from "@sanity/icons/Drop";
import { LemonIcon } from "@sanity/icons/Lemon";
import { SparklesIcon } from "@sanity/icons/Sparkles";
import { StarIcon } from "@sanity/icons/Star";
import { SyncIcon } from "@sanity/icons/Sync";
import { BasketIcon } from "@sanity/icons/Basket";

// Sidebar layout: Menu and Events, with drag-and-drop ordering for lists that
// appear on the website in a set order.
export const structure: StructureResolver = (S, context) =>
  S.list()
    .title("Dirty South Bar")
    .items([
      S.listItem()
        .title("Menu")
        .icon(BookIcon)
        .child(
          S.list()
            .title("Menu")
            .items([
              orderableDocumentListDeskItem({ type: "cocktail", title: "Cocktails", icon: StarIcon, S, context }),
              orderableDocumentListDeskItem({ type: "beer", title: "Beer", icon: DropIcon, S, context }),
              orderableDocumentListDeskItem({ type: "wine", title: "Wine", icon: SparklesIcon, S, context }),
              orderableDocumentListDeskItem({ type: "food", title: "Food", icon: BasketIcon, S, context }),
              S.divider(),
              S.listItem()
                .title("Menu notes & beer list")
                .icon(CogIcon)
                .child(S.document().schemaType("menuSettings").documentId("menuSettings").title("Menu notes & beer list")),
            ])
        ),
      S.listItem()
        .title("Events")
        .icon(CalendarIcon)
        .child(
          S.list()
            .title("Events")
            .items([
              orderableDocumentListDeskItem({ type: "weeklyEvent", title: "Weekly events", icon: SyncIcon, S, context }),
              S.documentTypeListItem("specialEvent")
                .title("Special events")
                .icon(LemonIcon)
                .child(
                  S.documentTypeList("specialEvent")
                    .title("Special events")
                    .defaultOrdering([{ field: "date", direction: "desc" }])
                ),
            ])
        ),
    ]);
