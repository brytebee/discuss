import { db } from "@/db";
import { path } from "@/path";
import { Chip } from "@nextui-org/react";
import Link from "next/link";

export default async function TopicList() {
  const topics = await db.topic.findMany();

  const renderTopics = topics.map((topic) => (
    <div key={topic.id}>
      <Link href={path.topicShow(topic.slug)}>
        <Chip color="warning" variant="shadow" className="my-1">
          {topic.slug}
        </Chip>
      </Link>
    </div>
  ));

  return <div className="flex flex-col p-2">{renderTopics}</div>;
}
