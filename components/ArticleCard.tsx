import { Article } from "@/data/articles";

interface ArticleCardProps {
    article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
    return (
        <div className="bg-emerald-800/20 backdrop-blur-sm border border-emerald-700/30 rounded-xl p-6 hover:bg-emerald-800/30 transition-colors">
            <h3 className="text-xl font-serif text-gold-400 mb-3 border-l-4 border-gold-500 pl-3">
                {article.title}
            </h3>
            <p className="text-emerald-100/90 leading-relaxed text-sm sm:text-base">
                {article.content}
            </p>
        </div>
    );
}
