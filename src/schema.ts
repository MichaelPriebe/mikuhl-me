import { relations } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const links = sqliteTable('links', {
	slug: text('slug').primaryKey(),
	url: text('url').notNull(),
	clicks: integer('clicks').notNull().default(0)
});

export const publicLinks = sqliteTable('public_links', {
	id: integer('id').primaryKey(),
	name: text('name').notNull(),
	fill: text('fill').notNull(),
	background: text('background').notNull(),
	path: text('path').notNull()
});

export const publicLinkEntries = sqliteTable('public_link_entries', {
	id: integer('id').primaryKey(),
	linkId: integer('link_id')
		.notNull()
		.references(() => publicLinks.id),
	slug: text('slug')
		.notNull()
		.references(() => links.slug),
	title: text('title').notNull(),
	subtitle: text('subtitle').notNull()
});

export const publicLinkRelations = relations(publicLinks, ({ many }) => ({
	entries: many(publicLinkEntries)
}));

export const publicLinkEntryRelations = relations(publicLinkEntries, ({ one }) => ({
	publicLink: one(publicLinks, {
		fields: [publicLinkEntries.linkId],
		references: [publicLinks.id]
	}),
	link: one(links, {
		fields: [publicLinkEntries.slug],
		references: [links.slug]
	})
}));

export const linkRelations = relations(links, ({ many }) => ({
	entries: many(publicLinkEntries)
}));
