import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { Tag } from '@/models'

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    // Danh sách 50 tag truyện phong phú
    const popularTags = [
      // Thể loại cổ điển (5)
      { name: 'Tiên hiệp', description: 'Truyện tu tiên, tu chân, thành thần', color: '#8B5CF6' },
      { name: 'Huyền huyễn', description: 'Thế giới phép thuật, siêu nhiên', color: '#F59E0B' },
      { name: 'Kiếm hiệp', description: 'Võ lâm, giang hồ, kiếm khách', color: '#EF4444' },
      { name: 'Đô thị', description: 'Cuộc sống hiện đại, thành phố', color: '#10B981' },
      { name: 'Khoa học viễn tưởng', description: 'Công nghệ tương lai, vũ trụ', color: '#06B6D4' },
      
      // Thể loại hot trend (10)
      { name: 'Trọng sinh', description: 'Quay lại quá khứ, sống lại', color: '#EC4899' },
      { name: 'Xuyên việt', description: 'Du hành thời gian, thế giới khác', color: '#8B5CF6' },
      { name: 'Hệ thống', description: 'Có hệ thống hỗ trợ, game hóa', color: '#3B82F6' },
      { name: 'Dị năng', description: 'Siêu năng lực, đặc biệt', color: '#F59E0B' },
      { name: 'Tu chân', description: 'Tu luyện thành tiên, đạo pháp', color: '#7C3AED' },
      { name: 'Xuyên nhanh', description: 'Xuyên qua nhiều thế giới', color: '#DB2777' },
      { name: 'Linh khí phục hồi', description: 'Thế giới linh khí hồi phục', color: '#059669' },
      { name: 'Toàn cầu online', description: 'Thế giới trở thành game', color: '#7C3AED' },
      { name: 'Cơ giáp', description: 'Người máy, cơ giáp chiến đấu', color: '#374151' },
      { name: 'Thần thoại', description: 'Các vị thần, thần thoại', color: '#92400E' },
      
      // Thể loại đặc biệt (10)
      { name: 'Mạt thế', description: 'Tận thế, sinh tồn', color: '#991B1B' },
      { name: 'Zombie', description: 'Xác sống, kinh dị', color: '#4B5563' },
      { name: 'Ma thuật', description: 'Phép thuật, pháp sư', color: '#7C2D12' },
      { name: 'Yêu ma', description: 'Quỷ thần, yêu quái', color: '#5B21B6' },
      { name: 'Linh dị', description: 'Siêu nhiên, ma quỷ', color: '#1F2937' },
      { name: 'Kinh dị', description: 'Gây sợ hãi, rùng rợn', color: '#000000' },
      { name: 'Trinh thám', description: 'Giải mã, phá án', color: '#0F172A' },
      { name: 'Huyền bí', description: 'Bí ẩn, khó hiểu', color: '#312E81' },
      { name: 'Phiêu lưu', description: 'Khám phá, mạo hiểm', color: '#065F46' },
      { name: 'Sinh tồn', description: 'Sống sót trong nghịch cảnh', color: '#7C2D12' },
      
      // Thể loại nhẹ nhàng (8)
      { name: 'Tình cảm', description: 'Tình yêu, lãng mạn', color: '#DB2777' },
      { name: 'Hài hước', description: 'Vui vẻ, hài hước', color: '#F59E0B' },
      { name: 'Slice of life', description: 'Cuộc sống thường ngày', color: '#10B981' },
      { name: 'Gia đình', description: 'Tình thân, gia đình', color: '#059669' },
      { name: 'Nấu ăn', description: 'Ẩm thực, đầu bếp', color: '#DC2626' },
      { name: 'Học đường', description: 'Trường học, tuổi thanh xuân', color: '#F97316' },
      { name: 'Chữa lành', description: 'Ấm áp, chữa lành tâm hồn', color: '#16A34A' },
      { name: 'Nhẹ nhàng', description: 'Không drama, thư giãn', color: '#84CC16' },
      
      // Thể loại chuyên môn (7)
      { name: 'Lịch sử', description: 'Bối cảnh lịch sử, cổ đại', color: '#92400E' },
      { name: 'Quân sự', description: 'Chiến tranh, quân đội', color: '#374151' },
      { name: 'Thể thao', description: 'Thể thao, thi đấu', color: '#059669' },
      { name: 'Kinh doanh', description: 'Thương mại, doanh nghiệp', color: '#DC2626' },
      { name: 'Y khoa', description: 'Bác sĩ, y học', color: '#DC2626' },
      { name: 'Pháp luật', description: 'Luật sư, tòa án', color: '#1F2937' },
      { name: 'Giáo dục', description: 'Giáo viên, học sinh', color: '#0369A1' },
      
      // Thể loại đặc thù Á Đông (5)
      { name: 'Cung đấu', description: 'Hoàng cung, tranh đấu', color: '#7C2D12' },
      { name: 'Điền văn', description: 'Nông thôn, bình dị', color: '#65A30D' },
      { name: 'Thương trường', description: 'Kinh doanh, thương mại', color: '#0369A1' },
      { name: 'Giải trí', description: 'Showbiz, giải trí', color: '#C026D3' },
      { name: 'Võ hiệp', description: 'Võ công, giang hồ', color: '#B91C1C' },
      
      // Thể loại game/anime (5)
      { name: 'Game', description: 'Game online, thế giới ảo', color: '#7C3AED' },
      { name: 'Liên minh', description: 'Liên Minh Huyền Thoại', color: '#1E40AF' },
      { name: 'Pokémon', description: 'Thế giới Pokémon', color: '#FBBF24' },
      { name: 'Naruto', description: 'Thế giới Naruto', color: '#F97316' },
      { name: 'One Piece', description: 'Thế giới One Piece', color: '#3B82F6' },
    ]
    
    // Xóa tất cả tag cũ trước khi tạo mới
    await Tag.deleteMany({})
    
    // Tạo tất cả tag mới
    const createdTags = await Tag.insertMany(popularTags)
    
    console.log(`Created ${createdTags.length} tags successfully`)
    
    return NextResponse.json({
      success: true,
      message: `Đã tạo ${createdTags.length} thể loại thành công`,
      tags: createdTags
    })
    
  } catch (error) {
    console.error('Error creating tags:', error)
    return NextResponse.json(
      { 
        error: 'Lỗi khi tạo thể loại',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
