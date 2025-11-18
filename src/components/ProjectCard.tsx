"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link as LinkIcon } from "lucide-react";
import { motion } from "framer-motion";

export type Project = {
  title: string;
  desc: string;
  tech: string[];
  href?: string;
};

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const { title, desc, tech, href } = project;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="group h-full"
    >
      {href ? (
        <a href={href} target="_blank" rel="noreferrer" className="block h-full">
          <Card className="rounded-2xl group-hover:shadow-md transition-shadow h-full">
            <CardContent className="p-6 flex flex-col h-full">
              <div className="flex-1">
                <h3 className="text-lg font-semibold leading-tight group-hover:underline inline-flex items-center gap-2">
                  {title} {href && <LinkIcon size={16} />}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {tech.map((t) => (
                  <Badge key={t} variant="secondary">
                    {t}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </a>
      ) : (
        <div className="block h-full">
          <Card className="rounded-2xl group-hover:shadow-md transition-shadow h-full">
            <CardContent className="p-6 flex flex-col h-full">
              <div className="flex-1">
                <h3 className="text-lg font-semibold leading-tight inline-flex items-center gap-2">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {tech.map((t) => (
                  <Badge key={t} variant="secondary">
                    {t}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </motion.div>
  );
}
